/* eslint-disable no-shadow */
const functions = {};
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const mdLinksPromise = [];

/* ---------- Función recursión (dir, file & ext) ----------*/
const getMdFile = (userPath) => {
  // Convertir la ruta en absoluta
  const getAbsolutePath = (userPath) => path.resolve(userPath);

  // Verificar si es file - valor booleano
  const checkFile = (userPath) => fs.statSync(userPath).isFile();

  // Extensión del file
  const getMdFileExt = (userPath) => path.extname(userPath) === '.md';

  // Leer el directorio
  const readDir = (userPath) => fs.readdirSync(userPath);

  let arrPathFilesMd = [];

  const userPathAbsolute = getAbsolutePath(userPath);
  if (checkFile(userPathAbsolute)) {
    // Si es archivo
    if (getMdFileExt(userPathAbsolute)) {
      arrPathFilesMd.push(userPathAbsolute);
    }
  } else { // Si no, es dir
    readDir(userPathAbsolute).forEach((file) => {
      const onlyFile = path.join(userPathAbsolute, file);
      const allFile = getMdFile(onlyFile);
      arrPathFilesMd = arrPathFilesMd.concat(allFile);
    });
  }
  return arrPathFilesMd;
};

/* ---------- Función para encontrar y extraer los links .md ----------*/
const getMdLinks = (userPath) => new Promise((res, rej) => {
  // Leer los files
  fs.readFile(userPath, 'utf8', (err, data) => {
    // Expresión regular para buscar coincidencia con los links .md
    // g flag global
    // eslint-disable-next-line no-useless-escape
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    const hashtag = '#';
    // userPath = path.resolve(userPath);
    if (err) {
      rej(new Error('Verificar ruta, no se encontró el archivo'));
    } else if (data.match(regexMdLinks)) {
      const matchMdLinks = data.match(regexMdLinks);

      const arrMdLinks = matchMdLinks.map((link) => {
        // Convierte los strings en un arr y elimina ']('
        const arrSplit = link.split('](');
        // Al 1er texto de cada arr remplazar [ por vacio
        const text = arrSplit[0].replace('[', '');
        // Al 2do texto de cada arr remplazar ) por vacio
        const href = arrSplit[1].replace(')', '');
        return ({ href, text, userPath });
      });

      // Filtrar en el arr con # para quitar links internos
      const getLinksUrl = arrMdLinks.filter((txt) => !txt.href.startsWith(hashtag));
      res(getLinksUrl);
    } else {
      res([]);
    }
  });
});

/* ---------- Función para extraer los links Md por cada file ----------*/

const getArrMdLinks = (newArrMd) => {
  newArrMd.forEach((file) => mdLinksPromise.push(getMdLinks(file)));
  return mdLinksPromise;
};

/* ---------- Función para validar los links Md  ----------*/
const getValidateMDLinks = (getLinksUrl) => {
  const arrValidate = getLinksUrl.map((links) => {
    const link = links;
    // Agregar http a todos los links que no lo traigan
    if (!/^https?:\/\//i.test(link.href)) {
      link.href = `http://${link.href}`;
    }
    // Petición http
    return axios.get(link.href)
      .then((resultado) =>
        // Nuevo obj para adicional la propiedad status 200 si está ok
        // eslint-disable-next-line implicit-arrow-linebreak
        ({ ...link, status: resultado.status, ok: true }))
      .catch((err) => {
        // Error desconocido
        let status = 404;
        if (err.resultado) {
          // Error predeterminado
          status = err.resultado.status;
        }
        // Nuevo obj para adicional la propiedad status si el link está false
        return { ...link, status, ok: false };
      });
  });

  return Promise.all(arrValidate);
};

functions.getArrMdLinks = getArrMdLinks;
functions.getMdFile = getMdFile;
functions.getMdLinks = getMdLinks;
functions.getValidateMDLinks = getValidateMDLinks;

module.exports = functions;
