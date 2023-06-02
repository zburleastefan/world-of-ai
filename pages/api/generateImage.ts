import type { NextApiRequest, NextApiResponse } from 'next';
import openAi from "../../utils/chatgpt";
import { adminDb } from '../../firebase/adminConfig';
import admin from 'firebase-admin';
import downloadPhoto from '../../utils/downloadPhoto';

type Data = {
    answer: string
}
  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const {prompt, auth} = req.body;

   if (!req.body.prompt) return res.status(400).json({answer: 'Pass in prompt field for image generation'});
    const response = await openAi.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });

    console.log(auth.currentUser.email + '---- email')

    // size: "1024x1024",
    if (!response.data) throw new Error('Unable to get image');

    const message: Message = {
      text: prompt,
      createdAt: admin.firestore.Timestamp.now(),
      imageUrl: response.data.data[0].url || "DALLE was unable to generate an image!",
      user: {
          _id: "DALLE",
          name: "DALLE",
          avatar: "/favicon.ico",
      },
    };

    // add message to firestore DB
    await adminDb
    .collection("users")
    .doc(auth?.currentUser?.email!)
    .collection("Images")
    .doc(auth?.currentUser?.uid!)
    .collection("imageList")
    .add(message);
    
    // console.log('received url ' + response.data.data[0].url);

    res.status(200).json({ answer: response?.data?.data[0].url ? response?.data?.data[0].url : "Failed to generate image! Please try again later." })
}