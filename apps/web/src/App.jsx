import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Propiedades from "./pages/Propiedades";
import Registro from "./pages/Registro";
import Navbar from "./components/Navbar";
import Favoritos from "./pages/Favoritos";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </>
  );
}

export default App;
