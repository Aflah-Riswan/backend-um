export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isBlocked: boolean;
  role: UserRole;
  createdAt: Date;
}
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isBlocked: boolean;
  createdAt: Date;
}
export type UpdateUserDTO = Partial<Pick<User, "name" | "email" | "role">>;
export interface IUserRepo {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(
    id: string,
    name: string,
    email: string,
    role: UserRole,
  ): Promise<void>;
  delete(id: string): Promise<void>;
  create(
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ): Promise<UserResponse>;
  updateBlockStatus(id : string , isBlocked: boolean) : Promise < void>
}

export interface IUserService {
  registerUser( name  : string , email : string , password : string , role : UserRole) : Promise<any> ;
  loginUser(email : string , password : string) : Promise<any>
}