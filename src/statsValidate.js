const mockLinks = require('../test/mockLinks.js')

const isValidate = true;

/*---------- Función validar y stats de los links Md ----------*/
const getStatsMDLinks = ((arr, isValidate ) => {
  const totalLinks = arr.length;

  //set permite almacenar valores únicos de cualquier tipo
  const uniqueLinks = [...new Set(arr.map((link) => link.href))];
  const brokenLinks = arr.filter(link => !link.ok);

  const statsLinks = `
    Total: ${totalLinks}
    Unique: ${uniqueLinks.length}`;

    if (isValidate) {
      return statsLinks + `\n    Broken: ${brokenLinks.length}`
    }

  return statsLinks;

  })

// console.log(getStatsMDLinks(mockLinks.arrMockValidate,isValidate));

