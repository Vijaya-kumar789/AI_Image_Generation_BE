import express from 'express';
import * as dotenv from 'dotenv';
import Post from '../Modules/Posts.js'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config();

const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Get all posts
router.route('/post').get(async (req, res) => {

    try {

        const posts = await Post.find({});

        res.status(200).json({success:true , data : posts})
        
    } catch (error) {
        res.status(500).json({success:false , message : error})
    }

})
//create posts
router.route('/post').post(async (req, res) => {

    try {
        // console.log(req.body);
        
        const { name, prompt } = req.body.values;
        const {  photo } = req.body;
        
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name, prompt, photo: photoUrl.url,
        })

        res.status(200).json({ success: true, data: newPost });

    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})


export default router