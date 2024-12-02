import React, { useState, useEffect } from "react";
import AllChats from "./AllChats";
import ActiveChat from "./ActiveChat";
import { useAuth } from "../context/AuthContext";

const Homepage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chats, setChats] = useState<{ id: number; name: string; messages: { content: string; senderId: number }[] }[]>([]);
  const {user} = useAuth()
  
  const currentUserId = user?.id ?? 0;

  const handleSetActiveChat = (name: string) => {
    setActiveChat(name);
  };

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
      } else {
        console.log("Failed to fetch chats", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching chats", error);
    }
  };

  const addMessage = (chatName: string, message: { content: string; senderId: number }) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.name === chatName
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="flex w-3/4 bg-white rounded-lg border-2">
      <div className="border-r-2 w-1/4">
        <AllChats setActiveChat={handleSetActiveChat} chats={chats} />
      </div>
      <div className="w-3/4">
        <ActiveChat activeChat={activeChat} chats={chats} addMessage={addMessage} currentUserId={currentUserId} />
      </div>
    </div>
  );
};

export default Homepage;


