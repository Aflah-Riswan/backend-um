import { User, UserRole } from "../interfaces/user.interface.js";

export abstract class Accounts implements Omit<User, "password"> {
  public readonly id: string;
  public name: string;
  public email: string;
  public abstract readonly role: UserRole;
  public readonly createdAt: Date;
  private _isBlocked: boolean;
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this._isBlocked = user.isBlocked;
    this.createdAt = user.createdAt;
  }
  public get isBlocked(): boolean {
    return this._isBlocked;
  }
  protected setBlockState(state: boolean): void {
    this._isBlocked = state;
  }
  public abstract canManageUsers(): boolean;
}

export class CustomerAccount extends Accounts {
  public readonly role: UserRole = "user";
  public canManageUsers(): boolean {
    return false;
  }
}

export class AdminAccount extends Accounts {
  public readonly role: UserRole = "admin";
  public canManageUsers(): boolean {
    return true;
  }
  public toggleTargetBlock(target: Accounts, status: boolean): void {
    if (target.id === this.id) {
      throw new Error(" admin cant block himself");
    }
    (target as any).setBlockState(status);
  }
}
