const path = require('path');
const { WebR } = require('webr');
const { loadPackages } = require('spidyr');

(async () => {

  console.log("👉 Loading WebR ----");
  globalThis.webR = new WebR();
  await globalThis.webR.init();

  console.log("👉 Loading R packages ----");
  await loadPackages(
    globalThis.webR,
    path.join(__dirname, 'webr_packages')
  )

  console.log("✅ Everything is ready!");

})();