import { error } from "node:console";
import { UserService } from "../services/user.services.js";
import { Request, Response } from "express";
import { IUserService, UserRole } from "../interfaces/user.interface.js";

export class UserController {
  constructor(private userService: IUserService) {}
  async register(req: Request, res: Response): Promise<void> {
    try {
    
      const { name, email, password, role } = req.body;
      console.log(name)
      if (!name || !email || !password) {
        res
          .status(400)
          .json({ error: "Name , email , password all fields are required" });
        return;
      }
      const newUser = await this.userService.registerUser(
        name,
        email,
        password,
        role as UserRole,
      );
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  async login (req : Request , res : Response) : Promise<void> {
   try {
    const { email , password} = req.body
    console.log(email , password)
    if(!email || !password ){
        throw new Error(" email and password are required")
    }
    const result = await this.userService.loginUser(email , password)
    res.status(200).json(result)
   } catch (error : any ) {
    res.status(401).json({ error: error.message });
   }
  }
}
