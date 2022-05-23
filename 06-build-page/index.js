const fs = require("fs");
const path = require("path");
let indexHTML = "";

fs.readFile(path.join(__dirname, "template.html"), "utf-8", (err, data) => {
  if (err) throw err;
  indexHTML = data;
});

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
  //Start create style.css
  fs.writeFile(path.join(__dirname, "project-dist", "style.css"), "", (err) => {
    if (err) throw err;
    fs.readdir(
      path.join(__dirname, "styles"),
      { withFileTypes: true },
      (err, data) => {
        for (let item of data) {
          if (
            item.isFile() &&
            path.extname(path.join(__dirname, "styles", item.name)) === ".css"
          ) {
            fs.readFile(
              path.join(__dirname, "styles", item.name),
              "utf-8",
              (err, data) => {
                if (err) throw err;
                fs.appendFile(
                  path.join(__dirname, "project-dist", "style.css"),
                  `${data}\n`,
                  (err) => {
                    if (err) throw err;
                  }
                );
              }
            );
          }
        }
      }
    );
  });
  //End create style.css

  //Start copying assets
  fs.mkdir(
    path.join(__dirname, "project-dist", "assets"),
    { recursive: true },
    (err) => {
      if (err) throw err;
      fs.readdir(path.join(__dirname, "assets"), (err, data) => {
        if (err) throw err;
        for (let dir of data) {
          fs.mkdir(
            path.join(__dirname, "project-dist", "assets", dir),
            { recursive: true },
            (err) => {
              if (err) throw err;
              fs.readdir(
                path.join(__dirname, "project-dist", "assets", dir),
                (err, subDir) => {
                  if (err) throw err;
                  if (subDir.length > 0) {
                    for (let item of subDir) {
                      fs.unlink(
                        path.join(
                          __dirname,
                          "project-dist",
                          "assets",
                          dir,
                          item
                        ),
                        (err) => {
                          if (err) throw err;
                        }
                      );
                    }
                  }
                  fs.readdir(
                    path.join(__dirname, "assets", dir),
                    (err, inner) => {
                      if (err) throw err;
                      for (let file of inner) {
                        fs.copyFile(
                          path.join(__dirname, "assets", dir, file),
                          path.join(
                            __dirname,
                            "project-dist",
                            "assets",
                            dir,
                            file
                          ),
                          (err) => {
                            if (err) throw err;
                          }
                        );
                      }
                    }
                  );
                }
              );
            }
          );
        }
      });
    }
  );
  //End copying assets

  //Start edit html file

  fs.readdir(path.join(__dirname, "components"), (err, data) => {
    if (err) throw err;
    for (let item of data) {
      fs.readFile(
        path.join(__dirname, "components", item),
        "utf8",
        (err, content) => {
          if (err) throw err;
          indexHTML = indexHTML.replace(
            `{{${path.parse(item).name}}}`,
            content
          );
          fs.writeFile(
            path.join(__dirname, "project-dist", "index.html"),
            indexHTML,
            (err) => {
              if (err) throw err;
            }
          );
        }
      );
    }
  });
  //End edit html file
});
