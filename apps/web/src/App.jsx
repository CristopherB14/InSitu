import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Propiedades from "./pages/Propiedades";
import Favoritos from "./pages/Favoritos";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPropiedades from "./pages/admin/AdminPropiedades";
import NotAuthorized from "./pages/NotAuthorized";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/no-autorizado" element={<NotAuthorized />} />

        {/* Sección protegida solo para ADMIN */}
        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/propiedades" element={<AdminPropiedades />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
