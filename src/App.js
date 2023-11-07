import LandingPage from "./pages/Landing Page/LandingPage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/Register Page/Register";
import DefaultLayout from "./components/layouts/DefaultLayout";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
