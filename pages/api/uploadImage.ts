import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';


//disable default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

// upload to local directory
const readFile = (
    req: NextApiRequest, 
    saveLocally?: boolean
): Promise<{fields: formidable.Fields; files: formidable.Files}>  => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/images");
        options.filename = (name, extension, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;
        }
    }
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (error, fields, files) => {
            if (error) reject(error);
            resolve({fields, files});
        })
    })
};
 
const handler: NextApiHandler = async ( req, res ) => {
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/images"));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
    }
    await readFile(req, true);
    res.json({done: "Ok"});
}

export default handler;