const fs = require('fs');
const path = require('path');

const fromDir = path.join(__dirname, 'files');
const toDir = path.join(__dirname, 'files-copy');

fs.mkdir(toDir, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(toDir, (err, data) => {
  if (err) throw err;
  if (data.length > 0) {
    for (let item of data) {
      const wayToFile = path.join(toDir, item);
      fs.unlink(wayToFile, (err) => {
        if (err) throw err;
      });
    }
  }
  fs.readdir(fromDir, (err, data) => {
    if (err) throw err;
    for (let item of data) {
      const wayFromFile = path.join(fromDir, item);
      const wayToFile = path.join(toDir, item);
      fs.copyFile(wayFromFile, wayToFile, (err) => {
        if (err) throw err;
        console.log(`${wayFromFile} was copied to ${wayToFile}`);
      });
    }
  });
});
