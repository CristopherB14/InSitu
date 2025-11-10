import { Router } from "express";
import { getAllUsers, getUserById, updateUserRole, deleteUser } from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id/role", updateUserRole);
router.delete("/:id", deleteUser);

export default router;
