import express, { response } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();


 const router = express.Router()

const apiToken = process.env.HUGGING_FACE_API_KEY;
const apiUrl = process.env.HUGGING_FACE_API_URL;

// Route to generate an image based on a prompt
router.route('/image').post(async(req,res)=>{
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Send request to Hugging Face API for image generation
    const response = await axios.post(
      apiUrl,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert image data to base64 format and send back as a response
    const imageBuffer = Buffer.from(response.data, 'binary');
    const imageBase64 = imageBuffer.toString('base64');

    res.json({ image: `data:image/png;base64,${imageBase64}` });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});



 export default router
