const { installIt } = require('./install');
const { parsePackageJson } = require('./packagejsonmanip');

function installFromPackageJson(
  package_json = "package.json",
  destination_folder = "webr_packages"
) {
  // Read the package.json file
  const package_json_read = parsePackageJson(package_json);
  const dependencies = package_json_read.rdependencies;

  if (dependencies) {
    // Install the dependencies
    for (let dependency of dependencies) {
      installIt(
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