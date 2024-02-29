const fs = require("fs");
const path = require("path");
const log = console.log;
const { execSync } = require("child_process");

const {installIt} = require("./install");

const init = async (destination_folder) => {

  log("👉 Initializing project ----");
  log("(This may take some time, please be patient)")

  // Making destination_folder folder full path
  destination_folder = path.resolve(destination_folder);
  basename = path.basename(destination_folder);

  // creating the folder if it doesn't exist
  if (!fs.existsSync(destination_folder)){
    fs.mkdirSync(destination_folder, { recursive: true });
  }

  const previousDirectory = process.cwd();

  process.chdir(destination_folder);

  // installing npm dependencies
  execSync(`npm init -y`);
  execSync(`npm install webr webrtools`);

  process.chdir(previousDirectory);

  // copying template
  log("👉 Copying template ----");
  fs.cpSync(
    path.join(__dirname, "..", "template"),
    path.join(destination_folder),
    { recursive: true }
  );

  let webr_packages = path.join(destination_folder, "webr_packages");

  // make dir
  fs.mkdirSync(
    webr_packages
  )

  log("👉 Installing {pkgload} ----");
  await installIt("pkgload", webr_packages)

  return;

}

module.exports = {
  init: init
}