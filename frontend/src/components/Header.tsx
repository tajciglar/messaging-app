import React from "react";
import { useAuth } from "./context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user, isLoggedIn, logOut } = useAuth(); // Get login state and actions
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate('/login')
  }

  return (
    <header className="bg-blue-600 text-white py-3 px-5 shadow-md flex justify-between items-center">
      <h1 className="text-3xl font-bold flex-grow text-center">Messaging App</h1>
      {isLoggedIn && (
        <div className="flex items-center justify-between gap-10 p-4 rounded-md">
            <p>{user}</p>
            <button
              onClick={handleLogOut}
              className="!bg-transparent !text-red-500 border-2 border-red-500 px-4 py-2 rounded-md hover:text-white hover:bg-red-500 focus:outline-none ml-auto"
            >
              Logout
        </button>
        </div>
        
      )}
    </header>
  );
};

export default Header;
