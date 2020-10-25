import { NextApiResponse, NextApiRequest } from 'next';
import fs from 'fs';
import { join } from 'path';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

function createDir() {
  if (!fs.existsSync(join(process.cwd(), '_files'))) {
    console.log('No existe');
    fs.mkdir(join(process.cwd(), '_files'), { recursive: true }, err => {
      if (err) throw err;
    });
  }
}

function createImg() {
  fs.createWriteStream(join(__dirname, 'tmp', 'foto.jpg'));
}

function getFile() {
  return fs.readFileSync(join(__dirname, '_posts', 'preview.md'), 'utf8');
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('File Buffer -> ', getFile());
  res.status(200).json({
    dir: process.cwd(),
    apis: fs.readdirSync(
      join(process.cwd(), '.next', 'serverless', 'pages', 'api')
    ),
    dirs: fs.readdirSync(join(process.cwd())),
    general_dirs: fs.readdirSync(join(__dirname)),
    tmp_dirs: fs.readdirSync(join(__dirname, 'tmp')),
    // etc_Dir: fs.readdirSync(join(__dirname, 'etc')),
    // usr_Dir: fs.readdirSync(join(__dirname, 'usr')),
    // var_Dir: fs.readdirSync(join(__dirname, 'tmp')),
    PROJECT_ROOT: serverRuntimeConfig.PROJECT_ROOT,
    package: fs.readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
    packnow__bridge: fs.readFileSync(
      join(process.cwd(), 'now__bridge.js'),
      'utf8'
    ),
    now__launcher: fs.readFileSync(
      join(process.cwd(), 'now__launcher.js'),
      'utf8'
    ),
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
