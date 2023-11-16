import LandingPage from "./pages/Landing Pages/LandingPage";
import Login from "./pages/Landing Pages/Login";
import Register from "./pages/Landing Pages/Register";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Dashboard from "./pages/Functional Pages/Dashboard";
import Inventory from "./pages/Functional Pages/Inventory";
import Invoice from "./pages/Functional Pages/Invoice";
import Quote from "./pages/Functional Pages/Quote";
import TimeClock from "./pages/Functional Pages/TimeClock";
import Profile from "./pages/Functional Pages/ProfilePage";
import AddEmployee from "./pages/Functional Pages/AddEmployeeInfo";
import EditPassword from "./pages/Functional Pages/EditPassword";
import EditProfileInfo from "./components/Profile/EditProfileInfo";
import { InventoryProvider } from "./contexts/InventoryContext";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import EditUsername from "./pages/Functional Pages/EditUsername";

function App() {
  return (
    <div className="App">
      <InventoryProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/timeclock" element={<TimeClock />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editusername" element={<EditUsername />} />
            <Route path="/editpassword" element={<EditPassword />} />
          </Route>
        </Routes>
      </InventoryProvider>
    </div>
  );
}

export default App;
