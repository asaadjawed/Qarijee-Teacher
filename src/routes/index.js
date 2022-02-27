import { Routes, Route, Link } from "react-router-dom";
import Signup from "../views/Signup";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";
import PendingTeacher from "../views/Pending";

const RoutesLayouts = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pendingRequest" element={<PendingTeacher />} />
    </Routes>
  );
};

export default RoutesLayouts;
