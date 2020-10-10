const fs = require('fs');
const functions = require('../src/functions.js');

/*---------- Funciones dir, file & ext ----------*/
// const mdLinks = (userPath) => {
//   //Verificar el path
//   const isValidPath = (userPath) => fs.existsSync(userPath);
//   // const arrLinks = functions.getMdFile(userPath);
//   // let arrLinks = '';
//   return new Promise((res, rej) => {
//     if (isValidPath(userPath) === false) {
//       rej(new Error('Path invalido, verificar path'));
//     } else {
//       const mdFiles = functions.getMdFile(userPath);
//       // console.log(functions.getMdLinks(userPath));
//       res(Promise.all(functions.getArrMdLinks(mdFiles)))
//       .then((arrObjsLinks) => arrObjsLinks.flat())

//       // .then((arrLinks) => {
//       //   // console.log('Holi', arrLinks.flat());
//       //   // if (validate) {
//       //   //   // console.log(arrLinks);
//       //   //   // arrLinks = functions.getValidateMDLinks(arrLinks);
//       //   //   res(functions.getValidateMDLinks(arrLinks));
//       //   // };
//       //   res(arrLinks.flat());
//       // });
//     }

//   })
//   };

const mdLinks = (userPath, { validate }) => {
  //Verificar el path
  const isValidPath = (userPath) => fs.existsSync(userPath);
  if (!isValidPath(userPath)) {
    throw Error('Path invalido, verificar path');
  } else {
    const arrMdFiles = functions.getMdFile(userPath);
    return Promise.all(functions.getArrMdLinks(arrMdFiles))
    // Para eliminar arr dentro de arr
      .then((arrObjsLinks) => arrObjsLinks.flat())
      .then((res) => {
        if (validate) {
          return functions.getValidateMDLinks(res);
        }
        return res;
      });
  }
};

  mdLinks('../test', {validate: false})
  .then((res) => console.log(res))
  .catch((error) => console.error(error));
