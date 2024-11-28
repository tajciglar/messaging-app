import React from "react";
import { useAuth } from "./context/AuthContext"; // Import the custom hook
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { isLoggedIn, logOut } = useAuth(); // Get login state and actions
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate('/login')
  }

  return (
    <header className="bg-blue-600 text-white py-3 px-5 shadow-md flex justify-between items-center">
      <h1 className="text-3xl font-bold flex-grow text-center">Messaging App</h1>
      {isLoggedIn && (
        <button
          onClick={handleLogOut}
          className="!bg-transparent !text-red-500 border-2 border-red-500 px-4 py-2 rounded-md hover:text-white hover:bg-red-500 focus:outline-none ml-auto"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
