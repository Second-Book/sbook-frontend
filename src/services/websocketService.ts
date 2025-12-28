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

class WebSocketService {
  private ws: WebSocket | null = null;
  private handlers: MessageHandler[] = [];
  
  connect(token: string) {
    if (typeof window === 'undefined') return;
    
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'}/ws/chat/?token=${token}`;
    this.ws = new WebSocket(wsUrl);
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handlers.forEach(handler => handler(data));
    };
    
    this.ws.onclose = () => {
      // Reconnect logic
      if (typeof window !== 'undefined') {
        setTimeout(() => this.connect(token), 3000);
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
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default new WebSocketService();

