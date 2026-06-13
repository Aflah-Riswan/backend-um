import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { UserRepository } from "../repositories/user.repo.js";
import { UserService } from "../services/user.services.js";

const userRouter = Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRouter.post('/register',(req,res)=> userController.register(req,res))
userRouter.post('/login',(req,res)=>{
    console.log(req.body)
    userController.login(req,res)
})

export default userRouter