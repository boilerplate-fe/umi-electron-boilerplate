/**
 * Copy package.json to dist/package.json
 */
const fs = require('fs');
const path = require('path');
/**
 * @type node or electron
 */
const type = process.argv[2];
const root = path.join(__dirname, '../');
const { name, version, description } = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf-8')
);

const basementPackageJSON = {
  name,
  version,
  description,
  dependencies: {
    log4js: '^6.2.1',
    sharp: '^0.25.2',
    sqlite3: '^4.1.1',
    multer: '^1.4.2',
    'class-transformer': '^0.2.3',
    'class-validator': '^0.11.0',
    express: 'latest',
    encoding: 'latest',
    'routing-controllers': 'latest',
  },
};

const ElectronPackageJSON = {
  ...basementPackageJSON,
  main: './main.bundle.js',
  postinstall: 'electron-builder install-app-deps',
  scripts: {
    start: 'electron ./main.bundle.js',
  },
};

const NodePackageJSON = {
  ...basementPackageJSON,
  main: './main.bundle.js',
  scripts: {
    start: 'node ./main.bundle.js',
  },
};

switch (type) {
  case 'node': {
    saveJSON(NodePackageJSON);
    break;
  }
  case 'electron': {
    saveJSON(ElectronPackageJSON);
    break;
  }
  default: {
    console.error(`project type : "${type}" is not supported`);
    process.exit(1);
  }
}

function saveJSON(json) {
  fs.writeFileSync(
    path.join(__dirname, '..', 'dist', 'package.json'),
    JSON.stringify(json, null, 2)
  );
}
