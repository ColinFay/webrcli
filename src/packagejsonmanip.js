const fs = require('fs');

function parsePackageJson(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const packageJson = JSON.parse(fileContent);
    return packageJson;
  } catch (error) {
    console.error('Error parsing' + filePath, error);
    return null;
  }
}

function writePackageJson(filePath, packageJson) {
  try {
    const fileContent = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync(filePath, fileContent, 'utf8');
  } catch (error) {
    console.error('Error writing package.json:', error);
  }
}

function addDependencies(
  dependencies,
  packageJson = "package.json"
) {
  const pk = parsePackageJson(packageJson)
  if (!pk.rdependencies) {
    pk.rdependencies = []
  }
  pk.rdependencies.push(dependencies)

  writePackageJson(packageJson, pk)
}

const append_package_json = function (package_to_add) {
  const package_json_path = process.cwd() + "/package.json";
  if (fs.existsSync(package_json_path)) {
    const package_json = JSON.parse(fs.readFileSync(package_json_path));

    if (!package_json.rdependencies) {
      package_json.rdependencies = [];
    }

    package_json.rdependencies.push(package_to_add);
    package_json.rdependencies = [...new Set(package_json.rdependencies)]
    fs.writeFileSync(package_json_path, JSON.stringify(package_json, null, 2));
  } else {
    console.log("❗️ No package.json file found");
  }
}

module.exports = {
  parsePackageJson,
  writePackageJson,
  addDependencies,
  append_package_json
};