import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/register", { name, email, password });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error en el registro");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
