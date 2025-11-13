import express from "express";
import cors from "cors";
import favoritesRouter from "./routes/favoritos";
import propertiesRouter from "./routes/propiedades";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import usersRouter from "./routes/users";
import ventasRouter from "./routes/ventas";
import inmobiliariasRoutes from "./routes/inmobiliarias";
import clientsRouter from "./routes/clients";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS y parseo de JSON
app.use(cors({
  origin: "*", // o "*" para permitir todos
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json()); // ⚠️ Esto es fundamental para req.body

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "API funcionando ✅" });
});

app.use("/ventas", ventasRouter);
app.use("/favorites", favoritesRouter);
app.use("/properties", propertiesRouter);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/users", usersRouter);
app.use("/inmobiliarias", inmobiliariasRoutes);
app.use("/clients", clientsRouter);

// Iniciar servidor
const PORT = process.env.PORT || 5127;
app.listen(PORT, () => console.log("Server running on port", PORT));
