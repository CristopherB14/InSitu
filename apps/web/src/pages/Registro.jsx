export default function Registro() {
  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" />
        </div>
        <button className="button">Ingresar</button>
      </form>
    </div>
  );
}

