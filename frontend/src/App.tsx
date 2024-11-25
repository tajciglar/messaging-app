import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SingUp";
import Homepage from "./components/Homepage/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const loggedIn = false;

  return (
    <div className="grid  grid-rows-[70px_1fr_50px] h-[110vh]">
      <Header />
      <main className=" flex-grow flex items-center justify-center bg-gray-100">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={loggedIn ? <Homepage /> : <LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </main>
  
      <Footer />
     
    </div>
  );
};

export default App;
