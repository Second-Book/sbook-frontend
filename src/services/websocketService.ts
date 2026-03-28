import apiClient from "./api";

type MessageHandler = (data: WebSocketMessage) => void;

export interface WebSocketMessage {
  type: 'message' | 'error' | 'notification';
  message?: string;
  sender?: string;
  recipient?: string;
  new_messages?: Message[];
}

export interface Message {
  id: number;
  sender: string;
  recipient: string;
  text: string;
  seen: boolean;
  sent_at: string;
}

async function getFreshToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  // Try refreshing to ensure we have a valid access token
  const refresh = localStorage.getItem('refresh_token');
  if (refresh) {
    try {
      const response = await apiClient.post('/api/token/refresh/', { refresh });
      const newToken = response.data.access;
      localStorage.setItem('access_token', newToken);
      return newToken;
    } catch {
      // Refresh failed — fall through to current token
    }
  }

  return localStorage.getItem('access_token');
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private handlers: MessageHandler[] = [];
  private intentionalClose = false;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  async connect(token?: string) {
    if (typeof window === 'undefined') return;
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.intentionalClose = false;

    // Always get a fresh token for the connection
    const freshToken = token || await getFreshToken();
    if (!freshToken) return;

    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'}/ws/chat/?token=${freshToken}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handlers.forEach(handler => handler(data));
    };

    this.ws.onclose = (event) => {
      this.ws = null;
      if (!this.intentionalClose && typeof window !== 'undefined') {
        // Code 4003 = auth rejected — refresh token before reconnecting
        const delay = event.code === 4003 ? 1000 : 3000;
        this.reconnectTimer = setTimeout(() => this.connect(), delay);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(recipient: string, message: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ recipient, message }));
    }
  }

  subscribe(handler: MessageHandler) {
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter(h => h !== handler);
    };
  }

  disconnect() {
    this.intentionalClose = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default new WebSocketService();
