import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/Auth/LogIn";
import SingUp from "./components/Auth/SingUp";
import Homepage from "./components/Homepage/Homepage";

const App: React.FC = () => {

  const loggedIn = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Homepage /> : <LogIn />}
        />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
