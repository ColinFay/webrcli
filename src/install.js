const { WebR } = require('webr');
const fs = require("fs");

const { installOnePackage } = require('./install-utils');
const { create_mount_folder_init_webr } = require('./config-utils.js');

const installIt = async function (
  package_to_install,
  destination_folder
) {

  const webR = new WebR();

  await create_mount_folder_init_webr(
    destination_folder,
    webR
  )

  await webR.evalRVoid(
    "source('/webrinstallscripts/get_list_of_tar_gz_dependencies_for_package.R')"
  )

  const get_list_of_tar_gz_dependencies_for_package = await webR.evalR(
    "get_list_of_tar_gz_dependencies_for_package"
  )

  const urlsr = await get_list_of_tar_gz_dependencies_for_package(
    package_to_install
  )

  const paks = urlsr.values[0].values
  const urls = urlsr.values[1].values
  let compiled_urls = {}

  for (let i = 0; i < paks.length; i++) {
    compiled_urls[paks[i]] = urls[i]
  }

  for await (pak of paks) {
    await installOnePackage(
      pkgname = pak,
      url = compiled_urls[pak],
      destination_folder
    )
  }

  await webR.close();

  return true
}

const installFromDesc = async function (
  description_file,
  destination_folder,
  with_exit = true
){

  const webR = new WebR();

  await webR.init();

  await webR.evalR("webr::install('desc')")

  await webR.FS.mkdir("/webrtoolstmp")

  const data = fs.readFileSync(description_file);

  await webR.FS.writeFile(
    '/webrtoolstmp/DESCRIPTION',
    data
  );

  const paks = await webR.evalRRaw(
    "desc::desc_get_deps('/webrtoolstmp/DESCRIPTION')$package",
    "string[]"
  )

  await installIt(
    paks,
    destination_folder
  )

  await webR.close()

  if (with_exit) {
    process.exit(1)
  }

}

const install = async function (
  package_to_install,
  destination_folder,
  with_exit = true
) {

  await installIt(
    package_to_install,
    destination_folder
  )

  if (with_exit) {
    process.exit(1)
  }
}

module.exports = {
  installIt: installIt,
  install: install,
  installFromDesc: installFromDesc
};