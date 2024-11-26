import React, { useState } from "react";
import AllChats from "./AllChats";
import ActiveChat from "./ActiveChat";

const Homepage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  // Function to fetch chat history based on the selected user
  const getHistory = (chatName: string) => {
    if (chatName === "Jane Smith") {
      return ["Hi there!", "How are you?", "Let's catch up soon!"];
    } else if (chatName === "John Doe") {
      return ["Hello!", "What are you up to?", "See you later!"];
    }
    return [];
  };

  const handleSetActiveChat = (name: string) => {
    setActiveChat(name);
    const history = getHistory(name);
    setMessages(history);
  };

  return (
    <div className="flex w-3/4 bg-white rounded-lg border-2">
      {/* Left Panel: List of Chats */}
      <div className="border-r-2 w-1/4">
        <AllChats setActiveChat={handleSetActiveChat} />
      </div>

      {/* Right Panel: Active Chat */}
      <div className="w-3/4">
        <ActiveChat activeChat={activeChat} messages={messages} />
      </div>
    </div>
  );
};

export default Homepage;
