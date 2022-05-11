const glob = require('glob');
const path = require('path');
const fse = require('fs-extra');

const packagePath = process.cwd();
const src = path.resolve(packagePath, './src');

async function generatePackages() {
  const directories = glob
    .sync(`${src}/*/`)
    .map((path) =>
      path
        .replace(/\/$/, '')
        .split('/')
        .pop()
    );

  const cmds = directories.map((dir) => {
    const pckg = {
      main: 'index.js',
      module: `../esm/${dir}`,
      typings: 'index.d.ts'
    };
    return fse.writeJSON(path.resolve(packagePath, dir, 'package.json'), pckg).catch(() => console.log(dir, ' not found\n'));
  });

  return Promise.all(cmds);
}

async function run() {
  try {
    await generatePackages();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
