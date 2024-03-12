const fs = require('fs');
const installIt = require('./install');

function installFromPackageJson(destination_folder = "webr_packages") {
  // Read the package.json file
  const packageJson = fs.readFileSync('package.json', 'utf8');
  const dependencies = JSON.parse(packageJson).rdependencies;

  // Loop over the dependencies and run installIt for each entry
  for (const dependency in dependencies) {
    installIt(dependency);
  }
}

module.exports = installFromPackageJson;