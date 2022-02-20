import { Routes, Route, Link } from "react-router-dom";
import Signup from "../views/Signup";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";

const RoutesLayouts = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesLayouts;
