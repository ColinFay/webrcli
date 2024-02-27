// Test for download-utils.js
const { download_and_untar } = require('../src/download-utils');
const path = require('path');
const os = require('os');
const fs = require('fs');

test('download_and_untar works', async () => {
  let tarball_url = 'https://cran.r-project.org/src/contrib/sudoku_2.8.tar.gz';
  let destination_folder = path.join(os.tmpdir(), 'abind');
  // Delete destination_folder if it exists
  if (
    fs.existsSync(destination_folder)
  ) {
    fs.rmdirSync(
      destination_folder,
      { recursive: true, force: true }
    )
  };
  let full_path = path.join(destination_folder, 'sudoku_2.8.tar.gz');
  let pkgname = 'sudoku';

  await download_and_untar(
    tarball_url,
    destination_folder,
    full_path,
    pkgname
  );

  expect(
    fs.existsSync(
      path.join(destination_folder, 'sudoku')
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