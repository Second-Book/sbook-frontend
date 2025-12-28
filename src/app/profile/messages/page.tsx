"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/hooks/useUserStore";
import websocketService from "@/services/websocketService";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import ChatWindow from "@/components/Chat/ChatWindow";

interface Conversation {
  username: string;
  lastMessage: string;
  unread: number;
}

export default function Messages() {
  const { user } = useUserStore((state) => state);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('access_token');
    if (token && user) {
      websocketService.connect(token);
      
      return () => websocketService.disconnect();
    }
  }, [user]);
  
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
