import { Router } from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllProperties,
  createProperty,
  deleteProperty,
  getAllSales,
  createSale
} from "../controllers/admin.controller";

const router = Router();

// === Usuarios ===
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

// === Propiedades ===
router.get("/properties", getAllProperties);
router.post("/properties", createProperty);
router.delete("/properties/:id", deleteProperty);

// === Ventas ===
router.get("/sales", getAllSales);
router.post("/sales", createSale);

export default router;
