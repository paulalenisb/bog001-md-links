const fs = require('fs');
const functions = require('../src/functions.js');

/*---------- Función Md Links ----------*/

const mdLinks = (userPath, { validate }) => {

  //Verificar el path
  const isValidPath = (userPath) => fs.existsSync(userPath);

  //Si es path es invalido
  if (!isValidPath(userPath)) {
    throw Error('Path invalido, verificar path');
  }
  //Si existe el path
  else {
    const arrMdFiles = functions.getMdFile(userPath);
    //Consumo de promesas
    return Promise.all(functions.getArrMdLinks(arrMdFiles))
    // Flat para eliminar arr dentro del otro arr
      .then((arrObjsLinks) => arrObjsLinks.flat())
      .then((res) => {
        //si pasa opción --validate
        if (validate) {
          return functions.getValidateMDLinks(res);
        }
        return res;
      });
  }
};

  module.exports = mdLinks;
