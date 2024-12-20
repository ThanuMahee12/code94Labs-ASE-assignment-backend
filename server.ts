import dotenv from "dotenv"
import express from "express"
import Router from "./routes/routes"
import cors from 'cors'
import path from 'path'
dotenv.config()

const PORT=process.env.PORT
const app=express()
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    const now = new Date();
    console.log(`${now.toISOString()} ${req.method} ${req.url}`);
    next();
});
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(Router)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})
