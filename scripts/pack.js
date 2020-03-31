const compressing = require('compressing');
const path = require('path');

const source = path.join(__dirname, '../out/win-unpacked');
const dist = path.join(__dirname, '../out/umi-electron-boilerplate.zip');

compressing.zip.compressDir(source, dist);
