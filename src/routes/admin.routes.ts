import { Router } from "express";
import { UserRepository } from "../repositories/user.repo.js";
import { AdminService } from "../services/admin.service.js";
import { AdminController } from "../controllers/admin.controller.js";

const adminRouter = Router();

const userRepository = new UserRepository();
const adminService = new AdminService(userRepository);
const adminController = new AdminController(adminService);


adminRouter.get("/users", (req, res) => adminController.fetchAll(req, res));
adminRouter.put("/users/:id", (req, res) => adminController.update(req, res));
adminRouter.delete("/users/:id", (req, res) => adminController.delete(req, res));
adminRouter.patch("/users/:id/block", (req, res) => adminController.blockToggle(req, res));

export default adminRouter;