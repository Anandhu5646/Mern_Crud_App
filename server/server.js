import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dbConnect from './config/dbConnect.js'
import path from 'path'
import userRouter from './routers/userRouter.js'
import adminRouter from './routers/adminRouter.js'
import morgan from 'morgan'
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve() + "/public"))
app.use(

    cors({
        origin: [
            "http://localhost:3000"
        ],
        credentials: true
    }))
dbConnect()


app.use ('/',userRouter)
app.use('/admin',adminRouter)

app.listen(9000, ()=>{
    console.log("server running on http://localhost:9000")
})