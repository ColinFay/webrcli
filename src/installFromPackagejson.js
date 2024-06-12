const { installIt } = require('./install');
const { parsePackageJson } = require('./packagejsonmanip');
const fs = require('fs');
async function installFromPackageJson(
  package_json = "package.json",
  destination_folder = "webr_packages"
) {
  // fail if the package.json file does not exist
  if (!fs.existsSync(package_json)) {
    console.error(`❌ ${package_json} does not exist`);
    return false;
  }

  // fail if the destination folder does not exist
  if (!fs.existsSync(destination_folder)) {
    console.error(`❌ ${destination_folder} does not exist`);
    return false;
  }

  // Read the package.json file
  const package_json_read = parsePackageJson(package_json);
  const dependencies = package_json_read.rdependencies;

  if (dependencies) {
    // Install the dependencies
    for (let dependency of dependencies) {
      await installIt(
        dependency,
        destination_folder
      );
    }
  } else {
    console.log("❗️ No rdependencies found in the package.json file");
  }

}

module.exports = {
  installFromPackageJson: installFromPackageJson
}