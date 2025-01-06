import React, { useState, useEffect } from "react";
import AllChats from "./AllChats";
import ActiveChat from "./ActiveChat";
import { useAuth } from "../context/AuthContext";

const Homepage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<{chatId: number; receiverId: number} | null>(null);  // Active chat by ID
  const [chats, setChats] = useState<{ id: number; name: string; messages: { content: string; senderId: number; receiverId: number; }[] }[]>([]);
  const { user } = useAuth();

  const currentUserId = user?.id ?? 0;

  const handleSetActiveChat = (chatId: number, receiverId: number ) => {
    setActiveChat({chatId, receiverId}); 
  };

  // Fetch the chats from the backend
  const getChats = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/chats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChats(data);
        console.log("data", data)
      } else {
        console.log("Failed to fetch chats", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching chats", error);
    }
  };

  // Add message to the active chat
  const addMessage = async (chatId: number, message: { content: string; senderId: number, receiverId: number }) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatId,
          content: message.content,
          senderId: message.senderId,
          receiverId: message.receiverId,
        }),
      });

      if (!response.ok) {
        console.log("Failed to send message", response.statusText);
      } else {
        const data = await response.json();
        console.log("Message sent to backend:", data);
      }
    } catch (error) {
      console.log("Error sending message to backend", error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="flex w-full bg-white rounded-lg border-2">
      <div className="border-r-2 w-1/4">
        <AllChats setActiveChat={handleSetActiveChat} chats={chats} />
      </div>
      <div className="w-3/4">
        <ActiveChat
          activeChat={activeChat}
          chats={chats}
          addMessage={addMessage}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
};

export default Homepage;
