const fs = require("fs");
const path = require("path");

const fromDir = path.join(__dirname, 'files');
const toDir = path.join(__dirname, 'files-copy');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err;
});

console.log(toDir)