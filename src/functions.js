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
const isValidPath = (userPath) => fs.existsSync(userPath);
// console.log(isValidPath(userRoute))

//Convertir la ruta en absoluta
const getAbsolutePath = (userPath) => path.resolve(userPath);
// console.log(getAbsolutePath('../test'));

//Verificar si es file - valor booleano
const checkFile = (userPath) => fs.statSync(userPath).isFile();
// console.log(checkFile(userRoute));

//Verificar si es un dir - valor booleano
// const checkDir = (userPath) => fs.statSync(userPath).isDirectory();
// console.log(checkDir(userRoute))

//Extensión del file
const getMdFileExt = (userPath) => path.extname(userPath) === '.md';

// Leer el directorio
const readDir = (userPath) => fs.readdirSync(userPath);

const getMdFile = (userPath) => {
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

console.log(getMdFile('../test'));

/*---------- Función para encontrar y extraer los links Md ----------*/

const getMdLinks = (userPath) => {
  userPath = path.resolve(userPath);
  const hashtag = '#';
  return new Promise((res, rej) => {
    fs.readFile(userPath, "utf8", (err, data) => {
      //Expresión regular para buscar coincidencia con los links md
      // g flag global
      const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
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
        res([])
        //rej(new Error ('No hay links en este archivo'))
      }
    });
  });
};

// getMdLinks(userRoute)
// .then((getLinksUrl) => {
// console.log(getLinksUrl);
// })

const getValidateMDLinks = (getLinksUrl) => {
  const arrValidate = getLinksUrl.map((link) => {
    if (!/^https?:\/\//i.test(link.href)) {
      link.href = 'http://' + link.href;
    }

    //El metodo get
    return axios.get(link.href)
      .then((resultado) => {
        // link.status = resultado.status;
        // link.ok = true;
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
        // link.status = status;
        // link.ok = false;
        return { ...link, status, ok: false };
      });
  });

  return Promise.all(arrValidate);
};

getValidateMDLinks(mockLinks.arrMockLinks)
  .then(console.log)
  .catch(console.error);

/*---------- Función estadistica de los links Md ----------*/
const getStatsMDLinks = (arr => {
  let flags = {};
  let uniqueLinks = [];
  const totalLinks = arr.length
  for(let i=0; i < totalLinks; i++) {
      if(flags[arr[i].href])
      continue;
      flags[arr[i].href] = true;
      uniqueLinks.push(arr[i].href);
  }
  return `
  Total: ${totalLinks}
  Unique: ${uniqueLinks.length}`;
  })

// console.log(getStatsMDLinks(arrMockLinks));

/*---------- Función validar y stats de los links Md ----------*/

functions.isValidPath = isValidPath;
functions.getMdFile = getMdFile;
functions.getMdLinks = getMdLinks;
functions.getValidateMDLinks = getValidateMDLinks;
functions.getStatsMDLinks = getStatsMDLinks;

module.exports = functions;
