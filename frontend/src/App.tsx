import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext"; 
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Homepage from "./components/Homepage/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; 

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="grid grid-rows-[70px_1fr_50px] h-screen">
          <Header />
          <main className="flex-grow flex items-center justify-center bg-gray-100">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected routes */}
              <Route
                path="/"
                element={<ProtectedRoute element={<Homepage />} redirectTo="/login" />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
