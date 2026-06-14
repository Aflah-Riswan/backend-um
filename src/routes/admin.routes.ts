import { Router } from "express";
import { UserRepository } from "../repositories/user.repo.js";
import { AdminService } from "../services/admin.service.js";
import { AdminController } from "../controllers/admin.controller.js";
import { authenticateJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

const userRepository = new UserRepository();
const adminService = new AdminService(userRepository);
const adminController = new AdminController(adminService);


adminRouter.get("/users",authenticateJWT,authorizeAdmin, (req, res) => adminController.fetchAll(req, res));
adminRouter.put("/users/:id",authenticateJWT,authorizeAdmin, (req, res) => adminController.update(req, res));
adminRouter.delete("/users/:id",authenticateJWT,authorizeAdmin, (req, res) => adminController.delete(req, res));
adminRouter.patch("/users/:id/block",authenticateJWT,authorizeAdmin, (req, res) => adminController.blockToggle(req, res));

export default adminRouter;