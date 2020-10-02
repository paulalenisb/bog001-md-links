// debe contener los tests unitarios para la función mdLinks().
// Tu inplementación debe pasar estos tets.

// const mdLinks = require('../');
// const {userPath,
//   absolutePath,
//   fileMd,
//   getMdLinks,
//   getValidateMDLinks,
//   getStatsMDLinks
// } = require('../src/functions.js')

const functions = require('../src/functions.js')
const arrMockLinks = require('./arrMockLinks.js')
const userPath = 'test/test-file.md';
const noLinks = 'test/test-nolink.md';
const noFile = 'testt/test-nolink.md';

/*---------- Test para los links Md ----------*/
describe('Obtener MD Links', () => {

  it('debería ser una función', () => {
      expect(typeof functions.getMdLinks).toBe('function');
  });

  it('debería retornar un array con objetos', () => {
    return functions.getMdLinks(userPath).then((links) => {
      expect(links).toEqual(arrMockLinks)
    })
  });

  it('Mostrar mensaje de error cuando no hay links en un archivo', () => {
    return functions.getMdLinks(noLinks).catch(e => {
      expect(e.message).toBe('No hay links en este archivo')
    });
  });

  it('Mostrar mensaje de error cuando no hay un archivo o la ruta no existe', () => {
    return functions.getMdLinks(noFile).catch(e => {
      expect(e.message).toBe('Verificar ruta, no se encontró el archivo')
    });
  });

  });

/*---------- test validar / axios de los links Md ----------*/

// describe('Validar MD Links', () => {

//   it('Llamar axios y obtener los links validados', () => {
//     const links = functions.getValidateMDLinks()
//   })

// })


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
