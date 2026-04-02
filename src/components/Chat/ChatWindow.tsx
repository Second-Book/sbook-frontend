"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Message, WebSocketMessage } from "@/services/websocketService";
import websocketService from "@/services/websocketService";
import MessageBubble from "./MessageBubble";
import apiClient from "@/services/api";
import useUserStore from "@/hooks/useUserStore";

interface ChatWindowProps {
  username: string;
}

export default function ChatWindow({ username }: ChatWindowProps) {
  const { user } = useUserStore((state) => state);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/chat/conversation/${username}/`);
      setMessages(response.data);
      if (user) {
        const unseenIds = response.data
          .filter((msg: Message) => msg.recipient === user.username && !msg.seen)
          .map((msg: Message) => msg.id);
        if (unseenIds.length > 0) {
          apiClient.post("/api/chat/mark/", { ids_to_mark: unseenIds }).catch(() => {});
        }
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  }, [username, user]);

  useEffect(() => {
    setMessages([]);
    setIsLoading(true);
    loadMessages();

    const handleWsMessage = (data: WebSocketMessage) => {
      if (data.type === "message") {
        const isRelevant = data.sender === username || data.recipient === username;
        if (isRelevant) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              sender: data.sender || "",
              recipient: data.recipient || "",
              text: data.message || "",
              seen: false,
              sent_at: new Date().toISOString(),
            },
          ]);
        }
      }
    };

    const unsubscribe = websocketService.subscribe(handleWsMessage);
    return unsubscribe;
  }, [username, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      websocketService.sendMessage(username, inputMessage);
      setInputMessage("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Učitavanje poruka...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-bold">{username}</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">Nema poruka. Pozdravite se!</div>
        )}
        {messages.map((message, index) => (
          <MessageBubble key={`${message.id}-${index}`} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Napišite poruku..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Pošalji
          </button>
        </div>
      </form>
    </div>
  );
}
