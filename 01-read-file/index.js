const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(way, 'utf-8');

let result = '';

stream.on('data', chunk => result += chunk);
stream.on('error', error => console.log(error.message));
stream.on('end', () => console.log(result));