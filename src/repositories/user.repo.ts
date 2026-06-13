import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  IUserRepo,
  UserRole,
  User,
  UserResponse,
} from "../interfaces/user.interface.js";
import { pool } from "../utils/db.utils.js";

export class UserRepository implements IUserRepo {
  async findByEmail(email: string): Promise<User | null> {
    const query =
      "SELECT id, name, email, password, role, createdAt FROM users WHERE email = ? LIMIT 1";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [email]);
    if (rows.length === 0) return null;
    return rows[0] as User;
  }
  async create(
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ): Promise<UserResponse> {
    const query =
      "INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)";
    await pool.execute<ResultSetHeader>(query, [
      id,
      name,
      email,
      password,
      role,
    ]);

    return {
      id,
      name,
      email,
      role,
      createdAt: new Date(),
    };
  }
}
