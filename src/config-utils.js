const fs = require("fs");
const path = require("path");

const create_mount_folder_init_webr = async function (
  destination_folder,
  webR
) {

  if (!fs.existsSync(destination_folder)) {
    fs.mkdirSync(destination_folder);
  }
  await webR.init();

  await webR.FS.mkdir("/webrtoolstmp")
  await webR.FS.mkdir("/webrinstallscripts")

  // This is where the R packages will be downloaded and installed
  await webR.FS.mount(
    "NODEFS",
    { root: destination_folder },
    `/webrtoolstmp`
  );

  // Loading the scripts from the R pkg
  await webR.FS.mount(
    "NODEFS",
    { root: path.join(__dirname, "..", "rpkg/R") },
    `/webrinstallscripts`
  );
}

module.exports = {
  create_mount_folder_init_webr: create_mount_folder_init_webr
};