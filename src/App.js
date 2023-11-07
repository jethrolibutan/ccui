import LandingPage from "./pages/Landing Pages/LandingPage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/Register Page/Register";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Dashboard from "./pages/Functional Pages/Dashboard";
import Inventory from "./pages/Functional Pages/Inventory";
import Invoice from "./pages/Functional Pages/Invoice";
import Quote from "./pages/Functional Pages/Quote";
import TimeClock from "./pages/Functional Pages/TimeClock";
import Profile from "./pages/Functional Pages/ProfilePage";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/timeclock" element={<TimeClock />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
