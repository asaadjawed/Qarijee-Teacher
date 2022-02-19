import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import QariDash from "../views/QariDash";
import QariSignUp from "../views/Signup";
const Layouts = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/QariDash" element={<QariDash />} />
      <Route path="/QariSignUp" element={<QariSignUp />} />
    </Routes>
  );
};

export default Layouts;
