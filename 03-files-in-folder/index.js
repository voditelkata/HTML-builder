const fs = require("fs");
const path = require("path");

const wayDir = path.join(__dirname, "secret-folder");

fs.readdir(wayDir, { withFileTypes: true }, async (err, data) => {
  try {
    for (let item of data) {
      if (item.isFile()) {
        const wayFile = path.join(wayDir, item.name);
        const name = path.parse(wayFile).name;
        const extension = path.extname(wayFile).slice(1);
        const size = await fs.promises.stat(wayFile);
        console.log(`${name} - ${extension} - ${size.size}b`);
      }
    }
  } catch (err) {
    console.error(err);
  }
});
