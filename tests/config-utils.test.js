// write test for config-utils.js
const { WebR } = require('webr');
const webR = new WebR();

const path = require('path');
const os = require('os');

const { create_mount_folder_init_webr } = require('../src/config-utils');

test('create_mount_folder_init_webr works', async () => {
  let destination_folder = path.join(os.tmpdir(), 'create_mount_folder_init_webr');


  await create_mount_folder_init_webr(
    destination_folder,
    webR
  );

  let webrtoolstmp = await webR.evalRBoolean("dir.exists('/webrtoolstmp')");

  let webrinstallscripts = await webR.evalRBoolean("dir.exists('/webrinstallscripts')");

  expect(webrtoolstmp).toBe(true);

  expect(webrinstallscripts).toBe(true);

  let webrinstallscripts_l = await webR.evalRNumber('length(list.files("/webrinstallscripts",recursive = TRUE))');

  expect(webrinstallscripts_l).toEqual(1);

  await webR.close();

}, 1000000);