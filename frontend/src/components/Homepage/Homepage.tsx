import React from "react";
import AllChats from "./AllChats";
import ActiveChat from "./ActiveChat";

const Homepage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AllChats  />

      {/* Active Chat */}
      <ActiveChat  />
    </div>
  );
};

export default Homepage;
