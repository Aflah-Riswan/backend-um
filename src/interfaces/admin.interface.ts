import { Accounts } from "../models/account.model.js";
import { UpdateUserDTO, User } from "./user.interface.js";

export interface IAdminService {
   createDomainAccount(user: any) : Accounts,
   getAllUsers() : Promise<User[]>,
   updateUserInfo(id: string, data: UpdateUserDTO) : Promise<void>,
   removeUserAccount(id: string, adminId: string) : Promise<void>,
   changeUserBlockState(id: string, shouldBlock: boolean, adminId: string) : Promise<void>

}