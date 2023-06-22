import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../firebase/adminConfig';
import admin from 'firebase-admin';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const {prompt, auth} = req.body;

   if (!req.body.prompt) return res.status(400).json({answer: 'No prompt!'});

    const message: Message = {
      text: prompt,
      createdAt: admin.firestore.Timestamp.now(),
      imageUrl: '',
      user: {
          _id: auth?.currentUser?.uid!,
          name: auth?.currentUser?.displayName! || auth?.currentUser?.email!,
          avatar: auth?.currentUser?.photoURL! || "/defaultUser.svg",
      },
    };

    // add message to firestore DB
    const dbResponse = await adminDb
    .collection("users")
    .doc(auth?.currentUser?.email!)
    .collection("Text")
    .doc(auth?.currentUser?.uid!)
    .collection("textList")
    .add(message);

    res.status(200).json({ answer: "Success!" })
}