import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT

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