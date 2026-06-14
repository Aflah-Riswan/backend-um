export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isBlocked : boolean;
  role: UserRole;
  createdAt: Date;
}
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isBlocked : boolean;
  createdAt: Date;
}
export interface IUserRepo {
  findByEmail(email: string): Promise<User | null>;
  create(
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ): Promise<UserResponse>;
}
