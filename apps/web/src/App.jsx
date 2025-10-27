import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Propiedades from "./pages/Propiedades";
import Registro from "./pages/Registro";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </>
  );
}

export default App;
