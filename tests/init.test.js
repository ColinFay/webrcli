const {init} = require('../src/init');

const path = require('path');
const os = require('os');
const fs = require('fs');

test('init works', async () => {
  // set a temp dir
  let temp_dir = path.join(os.tmpdir(), 'coucou')

  if (
    fs.existsSync(temp_dir)
  ) {
    fs.rmdirSync(
      temp_dir,
      { recursive: true, force: true }
    )
  };
  await init(temp_dir);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'index.js')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'package.json')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'webr_packages')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'webr_packages', 'pkgload')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(temp_dir, 'node_modules')
    )
  ).toBe(true);

}, 1000000);