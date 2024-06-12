const fs = require('fs');
const packageJsonManip = require('../src/packagejsonmanip');
const path = require('path');
const os = require('os');

describe('packagejsonmanip', () => {
  describe('parsePackageJson', () => {
    it('should parse the package.json file and return an object', () => {
      let filePath = path.join(os.tmpdir(), 'parsePackageJson.json');
      let packageJson = {
        "name": 'my-package',
        "version": '1.0.0',
        "dependencies": {
          "lodash": '^4.17.21',
          "axios": '^0.21.1'
        }
      };
      fs.writeFileSync(filePath, JSON.stringify(packageJson), 'utf8');

      let result = packageJsonManip.parsePackageJson(filePath);

      expect(result).toEqual(packageJson);

      fs.unlinkSync(filePath);
    });
  });

  describe('writePackageJson', () => {
    it('should write the package.json file with the provided content', () => {
      const packageJson = {
        "name": 'my-package',
        "version": '1.0.0',
        "dependencies": {
          "lodash": '^4.17.21',
          "axios": '^0.21.1'
        }
      };
      // create a temp json file
      let temp_file = path.join(os.tmpdir(), 'writePackageJson.json');
      packageJsonManip.writePackageJson(temp_file, packageJson);

      // expect the file to exist
      const result = packageJsonManip.parsePackageJson(temp_file);
      expect(result).toEqual(packageJson);

      fs.unlinkSync(temp_file);
    });
  }, 1000000);

  describe('addDependencies', () => {
    it('should add the provided dependencies to the package.json file', () => {
      const packageJson = {
        "name": 'my-package',
        "version": '1.0.0',
        "dependencies": {
          "lodash": '^4.17.21',
          "axios": '^0.21.1'
        }
      };
      // create a temp json file
      let temp_file = path.join(os.tmpdir(), 'package.json');
      packageJsonManip.writePackageJson(temp_file, packageJson);

      // add a new dependency
      packageJsonManip.addDependencies('golem', temp_file);

      // expect the new dependency to be added
      const result = packageJsonManip.parsePackageJson(temp_file);

      expect(result.rdependencies).toContain('golem');

      fs.unlinkSync(temp_file);
    });
  });

}, 1000000);