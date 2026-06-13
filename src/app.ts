import express from "express";
import { initializeDB } from "./utils/db.utils.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json())
const PORT = Number(process.env.PORT) 
app.use("/api/users",userRouter)
const startApp = async () => {
  await initializeDB();
  app.listen(PORT, () => {
    console.log(`🚀 Empty server listening on port ${PORT}`);
  });
};
startApp()
