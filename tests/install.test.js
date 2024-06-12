// tests for install.js

const { installIt, installFromDesc } = require('../src/install');
const path = require('path');
const os = require('os');
const fs = require('fs');

test('installIt works', async () => {
  let temp_dir = path.join(os.tmpdir(), 'install');
  process.cwd = jest.fn().mockReturnValue(temp_dir);
  if (
    fs.existsSync(temp_dir)
  ) {
    fs.rmdirSync(
      temp_dir,
      { recursive: true, force: true }
    )
  };

  const pkg_not_installed = await installIt("pouetpouet", temp_dir);

  expect(pkg_not_installed).toBe(false);

  await installIt("attempt", temp_dir);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'attempt')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'attempt', 'DESCRIPTION')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'attempt', 'R')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'rlang')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'rlang', 'DESCRIPTION')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'rlang', 'R')
    )
  ).toBe(true);

  fs.rmdirSync(
    temp_dir,
    { recursive: true, force: true }
  );

}, 1000000);

test('installFromDesc works', async () => {
  let temp_dir = path.join(os.tmpdir(), 'install');

  if (
    fs.existsSync(temp_dir)
  ) {
    fs.rmdirSync(
      temp_dir,
      { recursive: true, force: true }
    )
  };

  const DESCRIPTION = path.join(__dirname, "./", "DESCRIPTION");

  const package_not_installed = await installFromDesc(DESCRIPTION, temp_dir, with_exit = false);

  expect(
    package_not_installed
  ).toBe(false);

  fs.mkdirSync(temp_dir);

  await installFromDesc(DESCRIPTION, temp_dir, with_exit = false);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'attempt')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'attempt', 'DESCRIPTION')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'attempt', 'R')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'rlang')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'rlang', 'DESCRIPTION')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'rlang', 'R')
    )
  ).toBe(true);

  fs.rmdirSync(
    temp_dir,
    { recursive: true, force: true }
  );

}, 1000000);

// test installFromPackageJson
const { installFromPackageJson } = require('../src/installFromPackagejson.js');
const { execSync } = require('child_process');

test('installFromPackageJson works', async () => {
  let temp_dir = path.join(os.tmpdir(), 'installFromPackageJson');
  let temp_dir_dest = path.join(os.tmpdir(), 'installFromPackageJson_dest');

  if (
    fs.existsSync(temp_dir)
  ) {
    fs.rmdirSync(
      temp_dir,
      { recursive: true, force: true }
    )
  };

  if (
    fs.existsSync(temp_dir_dest)
  ) {
    fs.rmdirSync(
      temp_dir_dest,
      { recursive: true, force: true }
    )
  };

  fs.mkdirSync(temp_dir);

  const package_json = path.join(temp_dir, "package.json");

  const package_not_installed = await installFromPackageJson(
    package_json,
    temp_dir_dest
  );

  expect(
    package_not_installed
  ).toBe(false);

  fs.writeFileSync(
    package_json,
    JSON.stringify({
      rdependencies: ["attempt", "rlang"]
    })
  );

  await installFromPackageJson(
    package_json,
    temp_dir_dest
  );

  expect(
    package_not_installed
  ).toBe(false);

  fs.mkdirSync(temp_dir_dest);

  await installFromPackageJson(
    package_json,
    temp_dir_dest
  );

  expect(
    fs.existsSync(
      path.join(temp_dir_dest, 'attempt', 'DESCRIPTION')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir_dest, 'attempt', 'R')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir_dest, 'rlang')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir_dest, 'rlang', 'DESCRIPTION')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir_dest, 'rlang', 'R')
    )
  ).toBe(true);

  fs.rmdirSync(
    temp_dir,
    { recursive: true, force: true }
  );
  fs.rmdirSync(
    temp_dir_dest,
    { recursive: true, force: true }
  );
})