import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './Routes/postRoutes.js'
import generateImgRoutes from './Routes/generateImgRoutes.js'



const app = express()
app.use(cors());
app.use(express.json({ limit: '10mb' }));  // or any limit you want
app.use(express.urlencoded({ limit: '10mb', extended: true }));
dotenv.config()

app.use(cors({
    origin : process.env.CLIENT_SITE_URL,
    credentials : true,
}));


app.use('/api/v1', postRoutes)
app.use('/api/v1', generateImgRoutes)


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('Connecting to the MongoDB...')
    app.listen(process.env.PORT,()=>{

        console.log(`Server is running on port no ${process.env.PORT}`);
})
}).catch((error)=>{
    console.log('Error connecting to MongoDB...',error.message)
})