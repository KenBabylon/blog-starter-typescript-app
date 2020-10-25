import React from 'react';
import path from 'path';
import fs from 'fs';

export default function page1(props: any) {
  console.log(props);
  return <div>this is page1</div>;
}

export async function getServerSideProps(context: any) {
  console.log(process.cwd());
  console.log(__dirname);
  return {
    props: {
      dir: process.cwd(),
      dirname: __dirname,
      public: fs.readdirSync(process.cwd()),
    },
  };
}
