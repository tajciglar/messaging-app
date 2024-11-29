import React from "react";
import { useAuth } from "./context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user, isLoggedIn, logOut } = useAuth(); 
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate('/login')
  }

  return (
    <header className="bg-blue-600 text-white py-3 px-5 shadow-md flex justify-between items-center">
      <h1 className="text-3xl font-bold text-center flex-grow">Messaging App</h1>
      {isLoggedIn && (
        <div className="flex items-center gap-10 p-4 rounded-md">
          <p className="p-4">{user}</p>
          <button
            onClick={handleLogOut}
            className="!bg-transparent !text-red-500 border-2 border-red-500 px-4 py-2 rounded-md hover:text-white hover:bg-red-500 focus:outline-none"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
