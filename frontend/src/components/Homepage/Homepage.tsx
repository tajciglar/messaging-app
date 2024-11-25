import React, { useState } from "react";
import AllChats from "./AllChats";
import ActiveChat from "./ActiveChat";

const Homepage: React.FC = () => {

  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  return (
    <div className="flex w-3/4 bg-white rounded-lg border-2">
      <div className="border-r-2 w-1/4">
         <AllChats  setActiveChat={setActiveChat}/>
      </div>
      <div className="w-3/4">
        <ActiveChat  activeChat={activeChat} />
      </div>
    </div>
  );
};

export default Homepage;
