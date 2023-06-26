import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../firebase/adminConfig';
import admin from 'firebase-admin';
  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const {prompt, auth, audio} = req.body;

   if (!req.body.prompt) return res.status(400).json({answer: 'No prompt!'});

//    console.log(JSON.stringify(audio) + " = from api call")
    const base64Response: base64 = {
        prompt: prompt,
        createdAt: admin.firestore.Timestamp.now(),
        base64: audio,
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
    .collection("Text")
    .doc(auth?.currentUser?.uid!)
    .collection("textList")
    .add(base64Response);

    res.status(200).json({ answer: "Success!" })
}