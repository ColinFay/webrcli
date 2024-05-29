// tests for install-utils.js

const { installOnePackage } = require('../src/install-utils');
const path = require('path');
const os = require('os');
const fs = require('fs');

test('installOnePackage works', async () => {
  let pkgname = 'sudoku';
  let url = 'https://cran.r-project.org/src/contrib/sudoku_2.8.tar.gz';
  let destination_folder = path.join(os.tmpdir(), 'sudoku');
  process.cwd = jest.fn().mockReturnValue(destination_folder);
  if (
    fs.existsSync(destination_folder)
  ) {
    fs.rmdirSync(
      destination_folder,
      { recursive: true, force: true }
    )
  };

  fs.mkdirSync(destination_folder);

  await installOnePackage(
    pkgname,
    url,
    destination_folder
  );

  expect(
    fs.existsSync(
      path.join(destination_folder, 'sudoku')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(destination_folder, 'sudoku', 'DESCRIPTION')
    )
  ).toBe(true);

  expect(
    fs.existsSync(
      path.join(destination_folder, 'sudoku', 'R')
    )
  ).toBe(true);

  fs.rmdirSync(
    destination_folder,
    { recursive: true, force: true }
  );

  expect(
    fs.existsSync(
      destination_folder
    )
  ).toBe(false);
});