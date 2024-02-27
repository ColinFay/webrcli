// tests for install.js

const { installIt, installFromDesc } = require('../src/install');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { timeLog } = require('console');

test('installIt works', async () => {
  let temp_dir = path.join(os.tmpdir(), 'install');

  if (
    fs.existsSync(temp_dir)
  ) {
    fs.rmdirSync(
      temp_dir,
      { recursive: true, force: true }
    )
  };

  await installIt("attempt",temp_dir);

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

});

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

