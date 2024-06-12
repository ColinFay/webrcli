const fs = require("fs");
const path = require("path");

const { download_and_untar } = require('./download-utils');

const installOnePackage = async function (
  pkgname,
  url,
  destination_folder
) {
  // check if the package is already installed
  if (fs.existsSync(path.join(destination_folder, pkgname))) {
    console.log(`❗️ {${pkgname}} is already installed`)
    return
  }

  let full_path = fs.realpathSync(destination_folder) + "/" + path.basename(url);

  // check if the tarball is already downloaded
  // if yes, delete it
  if (fs.existsSync(full_path)) {
    fs.unlink(full_path, (err) => {
      if (err) {
        console.log('Error deleting:', full_path);
        console.log(err)
      }
    })
  }

  await download_and_untar(
    tarball_url = url,
    destination_folder = destination_folder,
    full_path = full_path,
    pkgname = pkgname
  )
}

module.exports = {
  installOnePackage: installOnePackage
};