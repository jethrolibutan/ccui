import logo from "./logo.svg";
import LandingPage from "./pages/Landing Page/LandingPage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/Register Page/Register";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
