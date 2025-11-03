"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const favoritos_1 = __importDefault(require("./routes/favoritos"));
const propiedades_1 = __importDefault(require("./routes/propiedades"));
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS y parseo de JSON
app.use((0, cors_1.default)({
    origin: "*", // o "*" para permitir todos
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json()); // ⚠️ Esto es fundamental para req.body
// Rutas
app.get("/", (req, res) => {
    res.json({ message: "API funcionando ✅" });
});
app.use("/favorites", favoritos_1.default);
app.use("/properties", propiedades_1.default);
app.use("/auth", auth_1.default);
const PORT = process.env.PORT || 5127;
app.listen(PORT, () => console.log("Server running on port", PORT));
