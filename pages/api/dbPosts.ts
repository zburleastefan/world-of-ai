import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../firebase/adminConfig';
import admin from "firebase-admin";

type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req;
    let {prompt, authorId, authorEmail, email, name, avatar} = req.body;

    if (!prompt) {
        res.status(400).json({answer: "Please provide a prompt!"});
        return;
    }

    const message: Message = {
        text: prompt || "ChatGPT was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        imageUrl: '',
        user: {
            _id: authorId,
            name: name,
            avatar: avatar,
        },
    };

    switch (method) {
        case 'GET': 
        //  //Get data from database
        // const get = await prisma.post.findMany({});

        // // send the post object back to the client
        // res.status(201).json( { answer: get.toString() });
        break;
        case 'POST':
            // add message to firestore DB
            await adminDb
                .collection('users')
                .doc(authorEmail)
                .collection('chats')
                .doc(authorId)
                .collection('messages')
                .add(message);

            res.status(200).json({ answer: message.text });
            // const post = await prisma.post.create({
            //     data: {
            //         title: `Message from ${name}`,
            //         content: prompt,
            //         authorId: authorId,
            //         email: email,
            //         name: name,
            //         avatar: avatar,
            //     }
            // });

            // // send the post object back to the client
            // res.status(201).json( { answer: post.toString() });
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
