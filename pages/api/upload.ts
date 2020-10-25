import { NextApiResponse, NextApiRequest } from 'next';
const Formidable = require('formidable-serverless') as any;
// import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { join } from 'path';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form
      .on('file', (name: any, file: any) => {
        const data = fs.readFileSync(file.path);
        fs.writeFileSync(
          join(__dirname, 'tmp', 'upload_'.concat('_', file.name)),
          data
        );
        fs.unlinkSync(file.path);
      })
      .on('aborted', () => {
        reject(res.status(500).send('Aborted'));
      })
      .on('end', () => {
        resolve(
          res.status(200).json({
            dir: process.cwd(),
            apis: fs.readdirSync(
              join(process.cwd(), '.next', 'serverless', 'pages', 'api')
            ),
            dirs: fs.readdirSync(join(process.cwd())),
            general_dirs: fs.readdirSync(join(__dirname)),
            temp_dir: fs.readdirSync(join(__dirname, 'tmp')),
            PROJECT_ROOT: serverRuntimeConfig.PROJECT_ROOT,
            package: fs.readFileSync(
              join(process.cwd(), 'package.json'),
              'utf8'
            ),
            packnow__bridge: fs.readFileSync(
              join(process.cwd(), 'now__bridge.js'),
              'utf8'
            ),
            now__launcher: fs.readFileSync(
              join(process.cwd(), 'now__launcher.js'),
              'utf8'
            ),
          })
        );
      });

    await form.parse(req);
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
