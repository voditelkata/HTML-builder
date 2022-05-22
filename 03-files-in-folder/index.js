const fs = require('fs');
const path = require('path');

const wayDir = path.join(__dirname, 'secret-folder');

fs.readdir(wayDir, { withFileTypes: true }, (err, data) => {
  if (err) return console.error(err.message);
  for (let item of data) {
    if (item.isFile()) {
      const wayFile = path.join(wayDir, item.name);
      const name = path.parse(wayFile).name;
      const extension = path.extname(wayFile).slice(1);
      fs.stat(wayFile, (err, stats) => {
        if (err) return console.error(err.message);
        console.log(
          `${name} - ${extension} - ${Math.floor(stats.size / 1024)}kb`
        );
      });
    }
  }
});
