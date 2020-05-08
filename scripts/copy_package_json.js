const fs = require('fs');
const path = require('path');

/**
 * Copy package.json to dist/package.json
 */

/**
 * @type node or electron
 */
const type = process.argv[2];

const basementPackageJSON = {
  name: 'umi-electron-boilerplate',
  version: '0.0.1',
  description: 'umi-electron-boilerplate',
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
