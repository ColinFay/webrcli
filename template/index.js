const path = require('path');
const { WebR } = require('webr');
const { loadPackages, LibraryFromLocalFolder } = require('spidyr');

const rfuns = new LibraryFromLocalFolder("rfuns");


(async () => {

  console.log("👉 Loading WebR ----");
  globalThis.webR = new WebR();
  await globalThis.webR.init();

  console.log("👉 Loading R packages ----");

  await loadPackages(
    globalThis.webR,
    path.join(__dirname, 'webr_packages')
  )

  await rfuns.mountAndLoad(
    globalThis.webR,
    path.join(__dirname, 'rfuns')
  );

  const hw = await rfuns.hello_world()

  console.log(hw.values);

  console.log("✅ Everything is ready!");

})();