import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IUserRepo, UserRole, User, UserResponse } from "../interfaces/user.interface.js";
import { pool } from "../utils/db.utils.js";

export class UserRepository implements IUserRepo {
  async findById(id: string): Promise<User | null> {
    const query = "SELECT id, name, email, password, role, createdAt FROM users WHERE id = ? LIMIT 1";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    if (rows.length === 0) return null;
    return rows[0] as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT id, name, email, password, role, createdAt FROM users WHERE email = ? LIMIT 1";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [email]);
    if (rows.length === 0) return null;
    return rows[0] as User;
  }
  async create(id: string, name: string, email: string, password: string, role: UserRole): Promise<UserResponse> {
    const query = "INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)";
    await pool.execute<ResultSetHeader>(query, [id, name, email, password, role]);
    return { id, name, email, role, isBlocked: false, createdAt: new Date() };
  }
  async findAll(): Promise<User[]> {
    const query = "SELECT id, name , email , role , isBlocked , createdAt FROM USERS ";
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows as User[];
  }
  async update(id: string, name: string, email: string, role: UserRole): Promise<void> {
    const query = "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?";
    await pool.execute(query, [name, email, role, id]);
  }
  async delete(id: string): Promise<void> {
    const query = "DELETE FROM users WHERE id = ?";
    await pool.execute(query, [id]);
  }
  async updateBlockStatus(id: string, isBlocked: boolean): Promise<void> {
    const query = "UPDATE users SET isBlocked = ? WHERE id = ?";
    await pool.execute(query, [isBlocked ? 1 : 0, id]);
  }
}
