// module.exports = () => {
//   // ...
// };
const fs = require('fs');
const path = require('path');
const axios = require('axios')
const fileFound = require('filehound');
const { resolve } = require('path');
const userPath = 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/src'



// const mdLinks = (userPath, options ) => {

//   };

    //resolves a sequence of paths or path segments into an absolute path
    const absolutePath = path.resolve(userPath);
    console.log(absolutePath);

    //returns the extension of the path, from the last occurrence of the .
    const fileMd = path.extname(userPath)
    console.log(fileMd);

const foundMdFile = () => {
  fileFound.create()
  .paths(userPath)
  .ext('md')
  .find()
  .then(filesMd => {
  filesMd.forEach(file => console.log('Found files', file))
})
}
foundMdFile(userPath)

//Convertir la función sincrona
const findMdLinks = (userPath) => {
  return new Promise ((res, rej) => {
    // fs.readFileSync(userPath, 'utf8', (err, data) =>
    fs.readFile(userPath, 'utf8', (err, data) => {
      //Expresión regular para buscar coincidencia con los links md
      const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
      //match
      const matchMdLinks = data.match(regexMdLinks);
      if (err) {
        console.log(`Error ${err}`);
        rej(err)
      }else{
        const arrMdLinks = matchMdLinks.map((link) => {
          const arrSplit = link.split('](');
          const text = arrSplit[0].replace('[', '');
          const href = arrSplit[1].replace(')','');
          return ({ href, text, userPath });
        });
        console.log(arrMdLinks);
      };
    });

  })

}

findMdLinks(userPath)









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
