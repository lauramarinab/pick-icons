
const fs = require("fs");
// const path = require("path");

const svgDirPath = "public/svg";

fs.readdir(svgDirPath, (err,files) => {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    const filesWithoutHidden = files.filter(file => !(/^\./.test(file)))
    
    const data = filesWithoutHidden.map((file) => ({icon: file}));
    const generateJson = `{"data": ${JSON.stringify(data)}}`

    try {
      fs.writeFileSync("./src/dataIcons.json", generateJson);
    } catch (err) {
      console.error("Cannot create dataIcons.json:", err.message);
    }
});
