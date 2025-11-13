import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import auth from "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });
      // Guardamos info básica en localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al loggearse");
    }
  };

  return (
  <div className="auth-wrapper">
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tenés cuenta? <a href="/register">Registrate aquí</a>
      </p>
    </div>
  </div>
  );
}
