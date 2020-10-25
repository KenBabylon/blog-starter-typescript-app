import fs from 'fs';
import path from 'path';
import dirTree from 'directory-tree';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

function getFile() {
  return fs.readFileSync(
    path.resolve('./public/assets/blog/authors/jj.jpeg'),
    'utf8'
  );
}

function getTree(arr) {
  return arr.reduce((prev, item) => {
    return {
      ...prev,
      [item.name]: item.children ? getTree(item.children) : 'end',
    };
  }, {});
}

export default async (req, res) => {
  // console.log('File Buffer -> ', getFile());

  res.status(200).json({
    dir: __dirname,
    direct: fs.readdirSync(__dirname),
    folder: process.cwd(),
    direct_folder: fs.readdirSync(process.cwd()),
    resolve: path.resolve('./_posts/preview.md'),
    PROJECT_ROOT: serverRuntimeConfig.PROJECT_ROOT,
    public: path.resolve('./public/assets/blog/authors/jj.jpeg'),
    // sd: path.resolve('@_posts'),
    // res1: require.resolve('@_posts'),
    // res2: path.dirname(require.resolve('_posts/preview.md')),
    dirs: getTree(dirTree(process.cwd()).children),
  });
};
