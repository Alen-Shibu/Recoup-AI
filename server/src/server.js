import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'

import webhookRoutes from "./routes/webhooks.js";

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/webhooks',webhookRoutes)

app.get('/health',(_,res)=>{
    res.status(200).json({message:"App is working!"})
})

const startServer = function(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('MongoDB connected')
        app.listen(PORT,()=>{
            console.log('Server is running on PORT:',PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
        process.exit(1)
    })
}

startServer();