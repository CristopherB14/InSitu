// import { useEffect, useState } from "react";
// import TarjetaPropiedad from "../components/TarjetaPropiedad";
// import API from "../services/api";

// export default function Home() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     API.get("/properties")
//       .then(res => setItems(res.data))
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="container">
//       <h1>Bienvenido a Inmobiliaria Demo</h1>
//       <h2>Propiedades destacadas</h2>
//       <div className="grid">
//         {items.map(p => <TarjetaPropiedad key={p.id} p={p} />)}
//       </div>
//     </div>
//   );
// }
// src/pages/Home.jsx
// src/pages/Home.jsx
import "../styles/home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-container">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a Inmobiliaria Demo</h1>
          <p>
            Tu espacio ideal te está esperando. Casas, departamentos y oficinas
            en las mejores ubicaciones de la ciudad.
          </p>
          <Link to="/propiedades" className="btn-primary">
            Ver Propiedades
          </Link>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="about">
        <h2>Sobre Nosotros</h2>
        <p>
          Contamos con años de experiencia ayudando a clientes a comprar, vender
          y alquilar propiedades con total confianza. Nuestro equipo de agentes
          profesionales está siempre disponible para asesorarte.
        </p>
      </section>

      {/* Servicios / Características */}
      <section className="features">
        <h2>Nuestros Servicios</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="icon">🏠</span>
            <h3>Compra y Venta</h3>
            <p>Propiedades en las mejores ubicaciones con gestión completa.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🔑</span>
            <h3>Alquileres</h3>
            <p>Alquileres seguros y flexibles según tus necesidades.</p>
          </div>
          <div className="feature-card">
            <span className="icon">💼</span>
            <h3>Asesoramiento Profesional</h3>
            <p>Te acompañamos en cada paso con expertos del rubro.</p>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="cta">
        <h2>Listo para encontrar tu propiedad ideal?</h2>
        <Link to="/propiedades" className="btn-primary">
          Explorar Propiedades
        </Link>
      </section>
    </main>
  );
}