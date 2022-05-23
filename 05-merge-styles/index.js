const fs = require("fs");
const path = require("path");

const wayDir = path.join(__dirname, "styles");
const resultDir = path.join(__dirname, "project-dist");

fs.writeFile(path.join(resultDir, "bundle.css"), '', (err) => {
  if (err) throw err;
});

fs.readdir(wayDir, { withFileTypes: true }, (err, data) => {
  for (let item of data) {
    if (
      item.isFile() &&
      path.extname(path.join(wayDir, item.name)) === ".css"
    ) {
      fs.readFile(path.join(wayDir, item.name), "utf-8", (err, data) => {
        if (err) throw err;
        fs.appendFile(
          path.join(resultDir, "bundle.css"),
          `${data}\n`,
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  }
});
