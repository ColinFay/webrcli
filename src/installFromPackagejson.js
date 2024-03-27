const fs = require('fs');
const installIt = require('./install');
const {parsePackageJson} = require('./packagejsonmanip');

function installFromPackageJson(
  package_json = "package.json",
  destination_folder = "webr_packages"
) {
  // Read the package.json file
  const package_json_read = parsePackageJson(package_json);
  const dependencies = package_json_read.rdependencies;
  // Install the dependencies
  for (const dependency in dependencies) {
    installIt(
      dependency,
      destination_folder
    );
  }
}

module.exports = installFromPackageJson;