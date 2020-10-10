const functions = {};
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const mockLinks = require('../test/mockLinks.js')
const { resolve } = require("path");
const { rejects } = require("assert");
const userRoute="C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md";
// const userRoute= '../test/test-file.md';

/*---------- Funciones dir, file & ext ----------*/

//Retorna un valor buleano
//
// console.log(isValidPath(userRoute))

//Verificar si es un dir - valor booleano
// const checkDir = (userPath) => fs.statSync(userPath).isDirectory();
// console.log(checkDir(userRoute))

const getMdFile = (userPath) => {
  //Convertir la ruta en absoluta
  const getAbsolutePath = (userPath) => path.resolve(userPath);

  //Verificar si es file - valor booleano
  const checkFile = (userPath) => fs.statSync(userPath).isFile();

  //Extensión del file
  const getMdFileExt = (userPath) => path.extname(userPath) === '.md';

  // Leer el directorio
  const readDir = (userPath) => fs.readdirSync(userPath);

  let arrPathFilesMd = []
  const userPathAbsolute = getAbsolutePath(userPath)
  if(checkFile(userPathAbsolute)) {
    // Si es archivo
    if(getMdFileExt(userPathAbsolute)) {
      arrPathFilesMd.push(userPathAbsolute);
    }
  } //Si no, es dir
  else {
    readDir(userPathAbsolute).forEach((file) => {
      const onlyFile = path.join(userPathAbsolute, file);
      const allFile = getMdFile(onlyFile);
      arrPathFilesMd = arrPathFilesMd.concat(allFile);
    });
  }
  return arrPathFilesMd;
}

// console.log(getMdFile('../test'));
//¿Sí tengo varios archivos md, qué pasa?

/*---------- Función para encontrar y extraer los links Md ----------*/
// const getMdLinks = (userPath) => {
//   let getLinksUrl = [];
//   let finaleArr = [];
//   return new Promise((res, rej) => {
//     // console.log('Mostrando función getMdFile' + getMdFile(userPath));
//     finaleArr = getMdFile(userPath).map((file) => {
//       fs.readFile(file, "utf8", (err, data) => {
//         //Expresión regular para buscar coincidencia con los links md
//         // g flag global
//         const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
//         const hashtag = '#';
//         // userPath = path.resolve(userPath);
//         if (err) {
//           rej(new Error ('Verificar ruta, no se encontró el archivo'))
//         } else if (data.match(regexMdLinks)) {
//           const matchMdLinks = data.match(regexMdLinks);
//           const arrMdLinks = matchMdLinks.map((link) => {
//             const arrSplit = link.split("](");
//             const text = arrSplit[0].replace("[", "");
//             const href = arrSplit[1].replace(")", "");
//             return ({ href, text, file });
//           });
//           getLinksUrl = arrMdLinks.filter((txt) => !txt.href.startsWith(hashtag));
//           res(getLinksUrl)
//         } else {
//           res({ href: 'No se encontraron links', text: 'No se encontraron links', userPath })
//         }
//       });
//     });
//     // res(Promise.all(finaleArr))
//     // .then()
//   });
//   // return finaleArr
// };

const getMdLinks = (userPath) => {
  return new Promise((res, rej) => {
    fs.readFile(userPath, "utf8", (err, data) => {
      //Expresión regular para buscar coincidencia con los links md
      // g flag global
      const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
      const hashtag = '#';
      userPath = path.resolve(userPath);
      if (err) {
        rej(new Error ('Verificar ruta, no se encontró el archivo'))
      } else if (data.match(regexMdLinks)) {
        const matchMdLinks = data.match(regexMdLinks);
        const arrMdLinks = matchMdLinks.map((link) => {
          const arrSplit = link.split("](");
          const text = arrSplit[0].replace("[", "");
          const href = arrSplit[1].replace(")", "");
          return ({ href, text, userPath });
        });
        const getLinksUrl = arrMdLinks.filter((txt) => !txt.href.startsWith(hashtag));
        res(getLinksUrl);
      } else {
        res({ href: 'No se encontraron links', text: 'No se encontraron links', userPath })
      }
    });
  });
};


// getMdLinks('../test')
// .then((getLinksUrl) => {
// console.log(getLinksUrl);
// })

const mdLinksPromise = [];

const getArrMdLinks = (newArrMd) => {
  newArrMd.forEach((file) => mdLinksPromise.push(getMdLinks(file)));
  return mdLinksPromise
}


const getValidateMDLinks = (getLinksUrl) => {
  const arrValidate = getLinksUrl.map((link) => {
    if (!/^https?:\/\//i.test(link.href)) {
      link.href = 'http://' + link.href;
    }

    //El metodo get
    return axios.get(link.href)
      .then((resultado) => {
        return { ...link, status: resultado.status, ok: true };
      })
      .catch ((err) => {
        //Error desconocido
        let status = 500;
        if (err.resultado) {
          //Error predeterminado
          status = err.resultado.status;
        }
        if(err.request) {
          status = 503;
        }
        return { ...link, status, ok: false };
      });
  });

  return Promise.all(arrValidate);
};


// getValidateMDLinks(mockLinks.arrMockLinks)
//   .then(console.log)
//   .catch(console.error);

functions.getArrMdLinks = getArrMdLinks;
functions.getMdFile = getMdFile;
// functions.getMdLinks = getMdLinks;
functions.getValidateMDLinks = getValidateMDLinks;

module.exports = functions;
