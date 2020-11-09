import { differenceBy } from "lodash";

const fs = require("fs");

type ImportedIcon = {
  name: string;
  filename: string;
  urlSrc: string;
  category: Array<string>;
  metadata: Array<string>;
};

const getRemovedHiddenFile = (file: string) => !/^\./.test(file);

const svgDirPath = "public/svg";

const subDirectories: Array<string> = fs.readdirSync(svgDirPath).filter(getRemovedHiddenFile);

const getAllIcons = (dirNames: Array<string>) => {
  let allIcons: Array<ImportedIcon> = [];

  dirNames.forEach((dirName) => {
    const path = `public/svg/${dirName}`;
    const files: Array<string> = fs.readdirSync(path).filter(getRemovedHiddenFile);

    const icons = files.map((filename: string) => {
      const filenameWithoutExtension = filename.replace(".svg", "");
      const iconName = filenameWithoutExtension.replace(/-/g, " ");

      return {
        name: iconName,
        filename: `${filenameWithoutExtension}-${dirName}.svg`,
        category: [dirName],
        urlSrc: `/svg/${dirName}/${filename}`,
        metadata: [filenameWithoutExtension],
      };
    });

    allIcons = [...allIcons, ...icons];
  });

  return allIcons;
};

const allIcons = getAllIcons(subDirectories);

try {
  fs.readFile("./src/dataIcons.json", (err: any, data: Buffer) => {
    const oldIcons: Array<ImportedIcon> = JSON.parse(data.toString()).data;

    const addedIcons = differenceBy(allIcons, oldIcons, "urlSrc");
    const removedIcons = differenceBy(oldIcons, allIcons, "urlSrc");

    const isDifference = Boolean([...addedIcons, ...removedIcons].length);

    const iconsWithoutRemoved = oldIcons.filter((icon) => !removedIcons.includes(icon));
    const updatedIcons = [...iconsWithoutRemoved, ...addedIcons];

    if (isDifference) {
      const updatedJson = `{"data": ${JSON.stringify(updatedIcons)}}`;
      fs.writeFileSync("./src/dataIcons.json", updatedJson);
    }
  });
} catch (err) {
  console.error("Cannot create dataIcons.json:", err.message);
}
