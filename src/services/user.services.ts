import { IUserRepo, UserRole } from "../interfaces/user.interface.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export class UserService {
  constructor(private userRepo: IUserRepo) {}
  async registerUser(
    name: string,
    email: string,
    password: string,
    role: UserRole = "user",
  ) {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error(" user with this email is already exist");
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const userId = crypto.randomUUID();
    return await this.userRepo.create(userId, name, email, passwordHash, role);
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid Email or Password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(" INvalid email or password");
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "1d" }
    );
    return  { user , token}
  }
}
