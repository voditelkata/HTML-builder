const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const way = path.join(__dirname, 'write.txt');
const textFile = fs.createWriteStream(way);
stdout.write('Please, enter text\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    console.log('Good bye!');
    process.exit();
  } else textFile.write(data);
});
process.on('SIGINT', () => {
  stdout.write('Bye!');
  process.exit();
});
