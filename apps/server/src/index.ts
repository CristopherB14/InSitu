import express from "express";
import cors from "cors";
import favoritesRouter from "./routes/favoritos";
import propertiesRouter from "./routes/propiedades";

const app = express();

// CORS y parseo de JSON
app.use(cors({
  origin: "https://insitu-homepage.onrender.com", // o "*" para permitir todos
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json()); // ⚠️ Esto es fundamental para req.body

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "API funcionando ✅" });
});

app.use("/favorites", favoritesRouter);
app.use("/properties", propertiesRouter);

const PORT = process.env.PORT || 5127;
app.listen(PORT, () => console.log("Server running on port", PORT));
