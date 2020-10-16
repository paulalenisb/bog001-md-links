const fs = require('fs');
const functions = require('./functions.js');

/* ---------- Función Md Links ----------*/

const mdLinks = (userPath, { validate }) => {
  // Verificar el path
  // eslint-disable-next-line no-shadow
  const isValidPath = (userPath) => fs.existsSync(userPath);

  // Si es path es invalido
  if (!isValidPath(userPath)) {
    throw Error('Path invalido, verificar path');
  } else { // Si existe el path
    const arrMdFiles = functions.getMdFile(userPath);
    // Consumo de promesas, función extraer links
    return Promise.all(functions.getArrMdLinks(arrMdFiles))
    // Flat para eliminar arr dentro del otro arr
      .then((arrObjsLinks) => arrObjsLinks.flat())
      .then((res) => {
        // si pasa opción --validate
        if (validate) {
          return functions.getValidateMDLinks(res);
        }
        return res;
      });
  }
};

module.exports = mdLinks;
