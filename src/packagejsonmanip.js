const fs = require('fs');

function parsePackageJson(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const packageJson = JSON.parse(fileContent);
    return packageJson;
  } catch (error) {
    console.error('Error parsing pouet.json:', error);
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

function addDependencies(dependencies, packageJson = "package.json") {
  const pk = parsePackageJson(packageJson)
  if (!pk.rdependencies) {
    pk.rdependencies = []
  }
  pk.rdependencies.push(dependencies)

  writePackageJson(packageJson, pk)
}

module.exports = {
  parsePackageJson,
  writePackageJson,
  addDependencies
};

