import "./App.css";
import { Routes, Route } from "react-router-dom";

//pages
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
