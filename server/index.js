import express from "express";
import cors from 'cors'
import { dbCn } from "./database/dbCon.js";
import router from "./routers/routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
dbCn();


const PORT = process.env.PORT||3000;

app.listen(PORT,()=>{
     console.log(`server is runnning on ${PORT}`)
})