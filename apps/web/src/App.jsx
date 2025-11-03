import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Propiedades from "./pages/Propiedades";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Favoritos from "./pages/Favoritos";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </>
  );
}

export default App;
