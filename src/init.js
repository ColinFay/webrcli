const fs = require("fs");
const path = require("path");
const log = console.log;
const { execSync } = require("child_process");

const {installIt} = require("./install");

const init = async (destination_folder) => {

  log("👉 Initializing project ----");

  // Making destination_folder folder full path
  destination_folder = path.resolve(destination_folder);
  basename = path.basename(destination_folder);

  // creating the folder if it doesn't exist
  if (!fs.existsSync(destination_folder)){
    fs.mkdirSync(destination_folder, { recursive: true });
  }

  // installing npm dependencies
  execSync(`cd ${destination_folder} && npm init -y`);
  execSync(`cd ${destination_folder} && npm install webr webrtools`);

  // copying template
  log("👉 Copying template ----");
  fs.copyFileSync(
    path.join(__dirname, "..", "template", "index.js"),
    path.join(destination_folder, "index.js")
  );

  let webr_packages = path.join(destination_folder, "webr_packages");

  // make dir
  fs.mkdirSync(
    webr_packages
  )

  await installIt("pkgload", webr_packages)

  return;

}

module.exports = {
  init: init
}