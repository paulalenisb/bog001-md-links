// module.exports = () => {
//   // ...
// };
const arrMockLinks = require('../test/arrMockLinks.js')
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const fileFound = require("filehound");
const { resolve } = require("path");
const { rejects } = require("assert");
const userRoute="C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md";
const functions = {};

// const mdLinks = (userPath, options ) => {

//   };


/*---------- Path Absoluto ----------*/

//resolves a sequence of paths or path segments into an absolute path
// const absolutePath = path.resolve(userPath);
// console.log(absolutePath);

/*---------- Extensión del Path ----------*/
//Returns the extension of the path, from the last occurrence of the .
// const fileMd = path.extname(userPath);
// console.log(fileMd);

/*---------- Posible Recursión (File & Dir) ----------*/

// const foundMdFile = () => {
//   fileFound
//     .create()
//     .paths(userPath)
//     .ext("md")
//     .find()
//     .then((filesMd) => {
//       filesMd.forEach((file) => console.log("Found files", file));
//     });
// };
// foundMdFile(userPath);


/*---------- Función para encontrar y extraer los links Md ----------*/

const getMdLinks = (userPath) => {
  userPath = path.resolve(userPath)
  const hashtag = ['#']
  return new Promise((res, rej) => {
    // fs.readFileSync(userPath, 'utf8', (err, data) =>
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
        rej(new Error ('No hay links en este archivo'))
      }
    });
  });
};

getMdLinks(userRoute)
.then((getLinksUrl) => {
console.log(getLinksUrl);
})

/*---------- Función para validar los links Md ----------*/
const getValidateMDLinks = (getLinksUrl) => {
  return new Promise ((resolve) => {
    const arrValidate = [];
    getLinksUrl.map((link) => {
      //Usamos push para agregar los valores al arr
      arrValidate.push(new Promise(resolve => {
        if (!/^https?:\/\//i.test(link.href)) {
          link.href = 'http://' + link.href;
          }
        //El metodo get
        axios.get(link.href)
        .then(resultado => {
          link.status = resultado.status;
          link.ok = true;
          resolve();
        }).catch (err => {
          //Error desconocido
          let status = 500;
          if (err.resultado) {
            //Error predeterminado
            status = err.resultado.status;
          }
          if(err.request) {
            status = 503;
          }
          link.status = status;
          link.ok = false;
          resolve()
        });
      }));
    });
    Promise.all(arrValidate)
    .then(() => {
      console.log(getLinksUrl);
    })
  });
}

// getValidateMDLinks(arrMockLinks)

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
      // console.log(array.length);
      // console.log(output.length);
  }
  return `
  Total: ${totalLinks}
  Unique: ${uniqueLinks.length}`;
  })

// console.log(getStatsMDLinks(arrMockLinks));

/*---------- Función validar y stats de los links Md ----------*/





// module.exports = {
//   userPath,
//   absolutePath,
//   fileMd,
//   getMdLinks,
//   getValidateMDLinks,
//   getStatsMDLinks,
// }

// functions.userPath = userPath;
// functions.absolutePath = absolutePath;
// functions.fileMd = fileMd;
functions.getMdLinks = getMdLinks;
functions.getValidateMDLinks = getValidateMDLinks;
functions.getStatsMDLinks = getStatsMDLinks;

module.exports = functions;



// const fileExists = (userPath) => {
//   try {
//     fs.statSync(userPath);
//     return true;
//   } catch (err) {
//     if (err.code === "ENOENT") {
//       return false;
//     }
//   }
// };
// fileExists(userPath);

// const isFile = (userPath) => {
//   const isFile = fs.lstatSync(userPath).isFile();
//   return isFile;
// };

// isFile(userPath);


// const absolutePath = (userPath) => {
//   console.log(path.isAbsolute(userPath));
//   //poner la condiciones
// };

// foundMdFile()

// const readMdFile = () => {
//   // const pathFile = foundMdFile()

//   fs.readFile('/etc/passwd', 'utf8', callback)
// };

// readMdFile()

//The path.isAbsolute() method
// determines if path is an absolute path.

//path.dirname('/foo/bar/baz/asdf/quux');
// Returns: '/foo/bar/baz/asdf'

// function fromDir(startPath,filter,callback){

//     //console.log('Starting from dir '+startPath+'/');

//     if (!fs.existsSync(startPath)){
//         console.log("no dir ",startPath);
//         return;
//     }

//     let files=fs.readdirSync(startPath);
//     for(let i=0;i<files.length;i++){
//         let filename=path.join(startPath,files[i]);
//         let stat = fs.lstatSync(filename);
//         if (stat.isDirectory()){
//             fromDir(filename,filter,callback); //recurse
//         }
//         else if (filter.test(filename)) callback(filename);
//     };
// };

// fromDir('C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links',/\.md$/,function(filename){
//     console.log('-- found: ',filename);
// })
