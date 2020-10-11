
/*---------- Función validar y stats de los links Md ----------*/
const getStatsMDLinks = ((arr, isValidate) => {
  const totalLinks = arr.length;

  //Set permite almacenar valores únicos de cualquier tipo
  const uniqueLinks = [...new Set(arr.map((link) => link.href))];

  //Filtro para encontrar los links false
  const brokenLinks = arr.filter(link => !link.ok);

  const statsLinks = `
    Total: ${totalLinks}
    Unique: ${uniqueLinks.length}`;

    // Si tiene la opción validate
    if (isValidate) {
      return statsLinks + `\n    Broken: ${brokenLinks.length}`
    }

  return statsLinks;
  });

  module.exports = getStatsMDLinks;

