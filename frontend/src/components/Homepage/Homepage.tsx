import React, { useState, useEffect } from "react";
import AllChats from "./AllChats";
import ActiveChat from "./ActiveChat";

const Homepage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chats, setChats] = useState<{ id: number; name: string; messages: { content: string }[] }[]>([]);

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
      const response = await fetch('http://localhost:3000/users/chats', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setChats(data);
      } else {
        console.log("Failed to fetch chats", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching chats", error);
    }
  };

  // Add message to the correct chat
  const addMessage = (chatName: string, message: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.name === chatName
          ? { ...chat, messages: [...chat.messages, { content: message }] }
          : chat
      )
    );
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="flex w-3/4 bg-white rounded-lg border-2">
      {/* Left Panel: List of Chats */}
      <div className="border-r-2 w-1/4">
        <AllChats setActiveChat={handleSetActiveChat} chats={chats} />
      </div>

      {/* Right Panel: Active Chat */}
      <div className="w-3/4">
        <ActiveChat activeChat={activeChat} chats={chats} addMessage={addMessage} />
      </div>
    </div>
  );
};

export default Homepage;
