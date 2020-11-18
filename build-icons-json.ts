import { differenceBy, includes } from "lodash";
import { join } from "path";

const fs = require("fs");

type ImportedIcon = {
  name: string;
  filename: string;
  urlSrc: string;
  categories: Array<string>;
  metadata: Array<string>;
};

const svgDirPath = "public/svg";

// removed hidden file from dir
const getRemovedHiddenFile = (file: string) => !/^\./.test(file);

const isDirectory = (source: string) => fs.lstatSync(source).isDirectory();

const getDirPath = (path: string) =>
  fs
    .readdirSync(path)
    .map((name: string) => join(path, name))
    .filter(isDirectory);

const buildDataIcons = (dirPath: string) => {
  const files: Array<string> = fs
    .readdirSync(dirPath)
    .filter(getRemovedHiddenFile)
    .filter((file: string) => includes(file, "svg"));

  const urlSrc = dirPath.slice(6, dirPath.length);
  const categories = dirPath.split("/").filter((category) => !(category === "svg" || category === "public"));
  const dirName = categories[categories.length - 1];

  const icons: Array<ImportedIcon> = files.map((filename: string) => {
    const filenameWithoutExtension = filename.replace(".svg", "");
    const iconName = filenameWithoutExtension.replace(/-/g, " ");

    return {
      name: iconName,
      filename: `${filenameWithoutExtension}-${categories[0]}.svg`,
      categories,
      urlSrc: `${urlSrc}/${filename}`,
      metadata: [filenameWithoutExtension],
    };
  });

  return icons;
};

const getSubDirectoriesPath = (dirPathNames: Array<string>) => {
  let allSubDirCategories: Array<string> = [];
  dirPathNames.forEach((path) => {
    const subDirCategories = getDirPath(path);
    allSubDirCategories = [...allSubDirCategories, ...subDirCategories];
  });
  return allSubDirCategories;
};

const getAllIcons = (dirPathNames: Array<string>) => {
  let allIcons: Array<ImportedIcon> = [];
  dirPathNames.forEach((path) => {
    allIcons = [...allIcons, ...buildDataIcons(path)];
  });
  return allIcons;
};

// public/svg/outline & public/svg/solid
const initialDirectories: Array<string> = getDirPath(svgDirPath);
// initial with sub directories path eg: public/svg/outline/animals
const allDirectoriesPath = [...initialDirectories, ...getSubDirectoriesPath(initialDirectories)];

const allIcons = getAllIcons(allDirectoriesPath);

try {
  fs.readFile("./src/dataIcons.json", (err: any, data: Buffer) => {
    const oldIcons: Array<ImportedIcon> = JSON.parse(data.toString()).data;
    const addedIcons = differenceBy(allIcons, oldIcons, "urlSrc");
    const removedIcons = differenceBy(oldIcons, allIcons, "urlSrc");
    const isDifference = Boolean([...addedIcons, ...removedIcons].length);
    const iconsWithoutRemoved = oldIcons.filter((icon) => !removedIcons.includes(icon));
    const updatedIcons = [...iconsWithoutRemoved, ...addedIcons];
    if (isDifference) {
      console.log("dataIcons.json updated 🚀");
      const updatedJson = `{"data": ${JSON.stringify(updatedIcons)}}`;
      fs.writeFileSync("./src/dataIcons.json", updatedJson);
    } else {
      console.log("Everything is up to date 🤓");
    }
  });
} catch (err) {
  console.error("Cannot create dataIcons.json:", err.message);
}
