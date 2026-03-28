"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import useUserStore from "@/hooks/useUserStore";
import websocketService, { Message, WebSocketMessage } from "@/services/websocketService";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import ChatWindow from "@/components/Chat/ChatWindow";
import apiClient from "@/services/api";

export interface Conversation {
  username: string;
  lastMessage: string;
  unread: number;
}

function buildConversations(
  messages: Message[],
  currentUsername: string,
  ensureUser?: string | null,
): Conversation[] {
  const convMap = new Map<string, { lastMessage: string; lastTime: string; unread: number }>();

  for (const msg of messages) {
    const otherUser = msg.sender === currentUsername ? msg.recipient : msg.sender;
    const existing = convMap.get(otherUser);
    const isNewer = !existing || msg.sent_at > existing.lastTime;

    convMap.set(otherUser, {
      lastMessage: isNewer ? msg.text : existing!.lastMessage,
      lastTime: isNewer ? msg.sent_at : existing!.lastTime,
      unread: (existing?.unread ?? 0) + (msg.recipient === currentUsername && !msg.seen ? 1 : 0),
    });
  }

  // Ensure the target user appears even without prior messages
  if (ensureUser && !convMap.has(ensureUser)) {
    convMap.set(ensureUser, { lastMessage: "", lastTime: "", unread: 0 });
  }

  return Array.from(convMap.entries())
    .map(([username, data]) => ({
      username,
      lastMessage: data.lastMessage,
      unread: data.unread,
    }))
    .sort((a, b) => {
      const aTime = convMap.get(a.username)!.lastTime;
      const bTime = convMap.get(b.username)!.lastTime;
      return bTime.localeCompare(aTime);
    });
}

function MessagesContent() {
  const { user } = useUserStore((state) => state);
  const searchParams = useSearchParams();
  const userParam = searchParams.get("user");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(userParam);

  const loadConversations = useCallback(async () => {
    if (!user) return;
    try {
      const response = await apiClient.get("/api/chat/");
      const messages: Message[] = response.data;
      setConversations(buildConversations(messages, user.username, userParam));
    } catch {
      if (userParam) {
        setConversations((prev) =>
          prev.length === 0 ? [{ username: userParam, lastMessage: "", unread: 0 }] : prev
        );
      }
    }
  }, [user, userParam]);

  // Connect WebSocket and load conversations
  useEffect(() => {
    if (typeof window === "undefined" || !user) return;

    const token = localStorage.getItem("access_token");
    if (token) {
      websocketService.connect(token);
    }

    loadConversations();

    const handleWsMessage = (data: WebSocketMessage) => {
      if (data.type === "message" || data.type === "notification") {
        loadConversations();
      }
    };
    const unsubscribe = websocketService.subscribe(handleWsMessage);

    return () => {
      unsubscribe();
      websocketService.disconnect();
    };
  }, [user, loadConversations]);

  return (
    <section className="w-full h-[600px] bg-white rounded-xl shadow-md border flex">
      <ChatSidebar
        conversations={conversations}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
      />
      {activeChat ? (
        <ChatWindow username={activeChat} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a conversation
        </div>
      )}
    </section>
  );
}

export default function Messages() {
  return (
    <Suspense
      fallback={
        <section className="w-full h-[600px] bg-white rounded-xl shadow-md border flex items-center justify-center text-gray-500">
          Loading messages...
        </section>
      }
    >
      <MessagesContent />
    </Suspense>
  );
}
