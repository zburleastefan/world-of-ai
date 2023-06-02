import type { NextApiRequest, NextApiResponse } from 'next';
import puppet from '../../puppeteer/puppeteer';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { storage } from '../../firebase/firebaseConfig';
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');


type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let {url, imgName, auth} = req.body;
    if (!url) {
        res.status(400).json({ answer: `Please provide a url! Url: ${url}`});
        return;
    }
    const imageRef = ref(storage, `images/${auth?.currentUser?.email}/${auth?.currentUser?.uid}/${imgName}.png`);
    // await uploadString(imageRef, url);
    try {
        const browser = await puppeteer.launch(
            {headless:"new"}
        );
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle0',
        }); 
        // await page.screenshot({path: path.join(process.cwd(),`/public/images/screenshot_${imgName}.png`)});
        const screenshot = async () => {
            const img = await page.screenshot({path:`${imgName}.png`});
            await uploadBytes(imageRef, img);
            // await uploadBytes(imageRef, img).then((snapshot) => {
            //     getDownloadURL(snapshot.ref).then((url) => {
            //         res.status(200).json( { answer: url});
            //     })
            // })
            browser.close();
        }
        screenshot();
    } catch(err) {
        res.status(400).json({ answer: err as string});
    }
    res.status(200).json( { answer: 'Puppeteer made a screenshot!'});
}