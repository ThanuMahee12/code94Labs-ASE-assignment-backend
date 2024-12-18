import dotenv from "dotenv"
import express from "express"
import Router from "./routes/routes"


dotenv.config()
const PORT=process.env.PORT
const app=express()
app.use(express.json())
app.use((req, res, next) => {
    const now = new Date();
    console.log(`${now.toISOString()} ${req.method} ${req.url}`);
    next();
});
app.use(Router)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})
