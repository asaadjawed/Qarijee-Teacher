import { Routes, Route, Link } from "react-router-dom";
import Signup from "../views/Signup";

const RoutesLayouts = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default RoutesLayouts;
