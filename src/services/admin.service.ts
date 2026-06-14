import { IUserRepo, UpdateUserDTO, User } from "../interfaces/user.interface.js";
import { Accounts, AdminAccount, CustomerAccount } from "../models/account.model.js";

export class AdminService {
  constructor(private userRepo: IUserRepo) {}

  private createDomainAccount(user: any): Accounts {
    return user.role === "admin" ? new AdminAccount(user) : new CustomerAccount(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.findAll();
  }

  async updateUserInfo(id: string, data: UpdateUserDTO): Promise<void> {
    const target = await this.userRepo.findById(id);
    if (!target) throw new Error("Operational Failure: Target profile not found.");

    const updatedName = data.name || target.name;
    const updatedEmail = data.email || target.email;
    const updatedRole = data.role || target.role;

    await this.userRepo.update(id, updatedName, updatedEmail, updatedRole);
  }

  async removeUserAccount(id: string, adminId: string): Promise<void> {
    if (id === adminId) throw new Error("Validation Error: Self termination is inhibited.");

    const target = await this.userRepo.findById(id);
    if (!target) throw new Error("Target account does not exist.");

    await this.userRepo.delete(id);
  }

  async changeUserBlockState(id: string, shouldBlock: boolean, adminId: string): Promise<void> {
    const adminData = await this.userRepo.findById(adminId);
    const targetData = await this.userRepo.findById(id);

    if (!adminData || !targetData) throw new Error("Context Resolution Fault: Profiles missing.");
    const adminAccount = this.createDomainAccount(adminData) as AdminAccount;
    const targetAccount = this.createDomainAccount(targetData);

    if (!adminAccount.canManageUsers()) {
      throw new Error("Access Denied: Unprivileged request context execution.");
    }
    adminAccount.toggleTargetBlock(targetAccount, shouldBlock);
    await this.userRepo.updateBlockStatus(targetAccount.id, targetAccount.isBlocked);
  }
}
