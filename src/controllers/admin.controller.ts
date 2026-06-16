import { Request, Response } from "express";
import { AdminService } from "../services/admin.service.js";
import { IAdminService } from "../interfaces/admin.interface.js";

export class AdminController {
  constructor(private adminService: IAdminService) {}

  async fetchAll(req: Request, res: Response): Promise<void> {
    try {
      const logs = await this.adminService.getAllUsers();
      res.status(200).json(logs);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      await this.adminService.updateUserInfo(req.params.id as string, req.body);
      res.status(200).json({ success: true, message: "Profile elements updated successfully." });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const adminId = (req as any).user?.id || ""; 
      await this.adminService.removeUserAccount(req.params.id as string, adminId);
      res.status(200).json({ success: true, message: "Target account purged from record pools." });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async blockToggle(req: Request, res: Response): Promise<void> {
    try {
      const adminId = (req as any).user?.id || "70b48252-c5cc-4e22-bad0-4788d624e3a1";
      const { isBlocked } = req.body;
      await this.adminService.changeUserBlockState(req.params.id as string, isBlocked, adminId);
      res.status(200).json({ success: true, message: "Target account blocking status synchronized." });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}