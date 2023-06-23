import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../firebase/adminConfig';
import admin from 'firebase-admin';
  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const {prompt, auth, base64Image} = req.body;

   if (!req.body.prompt) return res.status(400).json({answer: 'No prompt!'});

   console.log(JSON.stringify(base64Image) + " = from api call")
    const base64String: base64 = {
        prompt: prompt,
        createdAt: admin.firestore.Timestamp.now(),
        base64Image: base64Image,
        user: {
            _id: auth?.currentUser?.uid!,
            name: auth?.currentUser?.displayName! || auth?.currentUser?.email!,
            avatar: auth?.currentUser?.photoURL! || "/defaultUser.svg",
        },
    };

    // add img strings to firestore DB
    const dbResponse = await adminDb
    .collection("users")
    .doc(auth?.currentUser?.email!)
    .collection("Images")
    .doc(auth?.currentUser?.uid!)
    .collection("birdImageList")
    .add(base64String);

    res.status(200).json({ answer: "Success!" })
}