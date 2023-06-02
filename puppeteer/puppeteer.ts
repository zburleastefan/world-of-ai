const puppeteer = require('puppeteer');
import fs from 'fs/promises';
import path from 'path';

const puppet =  async (url: string, imgName: string) => {
    const browser = await puppeteer.launch(
        {headless:"new"}
    );
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle0',
    });
    try {
        await page.screenshot({path: path.join(process.cwd(),`/public/images/screenshot_${imgName}.png`)});
    } catch(err) {
        console.error(err)
    }
    browser.close();
    
    // await page.goto(fullUrl, {
    //     waitUntil: 'networkidle0',
    //   });
      
    //   await page.type('#username', 'scott');
    //   await page.type('#password', 'tiger');
      
    //   await page.click('#Login_Button');
      
    //   await page.waitForNavigation({
    //     waitUntil: 'networkidle0',
    //   });
      
    //   await page.pdf({
    //     path: outputFileName,
    //     displayHeaderFooter: true,
    //     headerTemplate: '',
    //     footerTemplate: '',
    //     printBackground: true,
    //     format: 'A4',
    //   });

    // await page.goto('https://oaidalleapiprodscus.blob.core.windows.net/private/org-bcC6o6cazeNgM7kHetOTbWJg/user-8OT7u7dJFc204KL7AZLkcp1W/img-GAXWDGcx4Gj43fKVzs8TbAQt.png?st=2023-05-31T06%3A18%3A59Z&se=2023-05-31T08%3A18%3A59Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-30T20%3A18%3A50Z&ske=2023-05-31T20%3A18%3A50Z&sks=b&skv=2021-08-06&sig=E8JxekVa1Dsz131V5%2BY3zBooOOcQJ%2Bb5LZ2hj9rNjgo%3D', {
    // await page.goto('https://youtube-clone-zburleastefan.vercel.app');
    // try {
    //     while (fs.existsSync(`./puppeteer/screenshots/screenshot_${screenshotNumber}.png`)) {
    //         //file exists
    //         ++screenshotNumber;
    //         // console.log("screenshot exists!")
    //     }
    //     while (fs.existsSync(`./puppeteer/pdfs/pdf_${pdfNumber}.pdf`)) {
    //         //file exists
    //         ++pdfNumber;
    //         // console.log("pdf exists!")
    //     }
    // } catch(err) {
    //     console.error(err)
    // }
    // await page.pdf({ path: `./puppeteer/pdfs/pdf_${pdfNumber}.pdf` });

};

export default puppet;

// npm i puppeteer 
// node puppeteer/puppeteer.ts
// npm run puppeteer