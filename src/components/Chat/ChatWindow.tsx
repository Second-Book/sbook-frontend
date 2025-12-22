"use client";

import { useEffect, useState, useRef } from "react";
import { Message } from "@/services/websocketService";
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

  useEffect(() => {
    // Load message history
    const loadMessages = async () => {
      try {
        const response = await apiClient.get(`/api/chat/conversation/${username}/`);
        setMessages(response.data);
        // Mark messages as seen
        if (user) {
          const unseenMessageIds = response.data
            .filter((msg: Message) => msg.recipient === user.username && !msg.seen)
            .map((msg: Message) => msg.id);
          if (unseenMessageIds.length > 0) {
            await apiClient.post('/api/chat/mark/', { ids_to_mark: unseenMessageIds }).catch(() => {
              // Silently fail if marking as seen fails
            });
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    loadMessages();

    // Subscribe to new messages
    const unsubscribe = websocketService.subscribe((data) => {
      if (data.type === 'message' && (data.sender === username || data.recipient === username)) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: data.sender || '',
            recipient: data.recipient || '',
            text: data.message || '',
            seen: false,
            sent_at: new Date().toISOString(),
          },
        ]);
      }
    });

    return unsubscribe;
  }, [username]);

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
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

