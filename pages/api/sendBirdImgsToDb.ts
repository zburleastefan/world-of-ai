import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../firebase/adminConfig';
import admin from 'firebase-admin';
  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const {prompt, auth, base64Image} = req.body;

//    console.log(JSON.stringify(base64Image) + " = from api call")
    const birdImgsToDb: sendBirdImgs = {
        prompt: prompt,
        createdAt: admin.firestore.Timestamp.now(),
        birdImage: base64Image,
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
    .add(birdImgsToDb);

    // console.log(JSON.stringify(dbResponse))

    res.status(200).json({ answer: JSON.stringify(dbResponse) })
}