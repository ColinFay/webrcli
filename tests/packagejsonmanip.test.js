const fs = require('fs');
const packageJsonManip = require('../src/packagejsonmanip');
const path = require('path');
const os = require('os');

describe('packagejsonmanip', () => {
  describe('parsePackageJson', () => {
    it('should parse the package.json file and return an object', () => {
      const filePath = 'path/to/package.json';
      const packageJson = {
        name: 'my-package',
        version: '1.0.0',
        dependencies: {
          lodash: '^4.17.21',
          axios: '^0.21.1'
        }
      };
      fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(packageJson));

      const result = packageJsonManip.parsePackageJson(filePath);

      expect(result).toEqual(packageJson);
    });
  });

  describe('writePackageJson', () => {
    it('should write the package.json file with the provided content', () => {
      const packageJson = {
        name: 'my-package',
        version: '1.0.0',
        dependencies: {
          lodash: '^4.17.21',
          axios: '^0.21.1'
        }
      };
      // create a temp json file
      let temp_file = path.join(os.tmpdir(), 'package.json');
      packageJsonManip.writePackageJson(temp_file, packageJson);

      // expect the file to exist
      const result = packageJsonManip.parsePackageJson(temp_file);
      expect(result).toEqual(packageJson);
    });
  });

  describe('addDependencies', () => {
    it('should add the provided dependencies to the package.json file', () => {
      expect(true).toEqual(true);
      const packageJson = {
        name: 'my-package',
        version: '1.0.0',
        dependencies: {
          lodash: '^4.17.21',
          axios: '^0.21.1'
        }
      };
      // create a temp json file
      let temp_file = path.join(os.tmpdir(), 'package.json');
      console.log('ouetpu', temp_file);
      packageJsonManip.writePackageJson(temp_file, packageJson);

      // add a new dependency
      packageJsonManip.addDependencies('golem', temp_file);

      // expect the new dependency to be added
      const result = packageJsonManip.parsePackageJson(temp_file);

      expect(JSON.parse(result).rdependencies).toContain('golem');
    });
  });
});
