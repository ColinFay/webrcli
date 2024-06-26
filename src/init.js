const fs = require("fs");
const path = require("path");
const log = console.log;
const error = console.error;
const { execSync } = require("child_process");

const {installIt} = require("./install");

const init = async (destination_folder) => {

  // check if destination_folder does not exists
  if (fs.existsSync(destination_folder)){
    error(`❌ A folder named ${destination_folder} already exists. \nPlease choose another name or remove the existing folder.`);
    return false;
  }

  log("👉 Initializing project ----");
  log("(This may take some time, please be patient)")

  // Making destination_folder folder full path
  destination_folder = path.resolve(destination_folder);

  // creating the folder if it doesn't exist
  if (!fs.existsSync(destination_folder)){
    fs.mkdirSync(destination_folder, { recursive: true });
  }

  const previousDirectory = process.cwd();

  process.chdir(destination_folder);

  // installing npm dependencies
  log("⏳ launching npm init, installing webr & spidyr----");
  execSync(`npm init -y`);
  execSync(`npm install webr spidyr`);

  // append to package.json
  let packageJson = JSON.parse(fs.readFileSync("package.json"));
  packageJson.scripts["postinstall"] = "webrcli installFromPackageJson";
  packageJson.scripts["start"] = "node index.js";
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

  process.chdir(previousDirectory);

  // copying template
  log("🗂️ Copying project skeleton from spidyr----");

  fs.cpSync(
    path.join(destination_folder, "node_modules", "spidyr", "template"),
    path.join(destination_folder),
    { recursive: true }
  );

  let webr_packages = path.join(destination_folder, "webr_packages");

  // make dir
  fs.mkdirSync(
    webr_packages
  )

  process.chdir(destination_folder);

  log("👉 Installing {pkgload} ----");
  await installIt("pkgload", webr_packages)

  process.chdir(previousDirectory);

  return;

}

module.exports = {
  init: init
}