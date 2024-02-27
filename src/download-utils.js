const axios = require('axios');
const tar = require('tar');
const fs = require('fs');

async function download_and_untar(
  tarball_url,
  destination_folder,
  full_path,
  pkgname
) {
  try {
    const response = await axios.get(
      tarball_url,
      { responseType: 'arraybuffer' }
    );

    if (!fs.existsSync(destination_folder)) {
      fs.mkdirSync(
        destination_folder,
        { recursive: true }
      );
    }

    fs.writeFileSync(
      full_path,
      Buffer.from(response.data)
    );

    // Extract the tarball
    await tar.x({
      file: full_path,
      cwd: destination_folder
    });

    // Delete the tarball
    fs.unlinkSync(full_path)
    console.log(`✅ {${pkgname}} downloaded and extracted ----\n`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = {
  download_and_untar: download_and_untar
};