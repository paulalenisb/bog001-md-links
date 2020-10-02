const fs = require('fs');
const path = require('path');
const userPath = 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md'

const readMd = (userPath) => {
  const links = [];

  const regularExp = '^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';

//Creamos un objeto RegExp, para hacer coincidir el texto con un patrón
  const regex = new RegExp(regularExp)

  fs.readFileSync(userPath, 'utf8', (err, data) => {
    //Expresión regular para buscar coincidencia con los links md
    // g flag global
    // const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    //match
    const matchMdLinks = data.match(regex);
    if (err) {
      console.log(`Error ${err}`);
      rej(err)
    }else{
      const arrMdLinks =  matchMdLinks.push((link) => {
        const arrSplit = link.split('](');
        const text = arrSplit[0].replace('[', '');
        const href = arrSplit[1].replace(')','');
        return ({ href, text, userPath });
      });
      console.log(arrMdLinks);
    };
  });
}

readMd(userPath)
