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
const mockLinks = require('./mockLinks.js')
const axios = require('axios');
const path = require('path');
const { fstat } = require('fs');
const userPath = './test-file.md';
const noLinks = './test-nolink.md';
const noFile = './testt-nolink.md';
// const absolutePath = path.resolve(userPath);



jest.mock('axios');

/*---------- Test para los links Md ----------*/
describe('Obtener MD Links', () => {

  it('debería ser una función', () => {
      expect(typeof functions.getMdLinks).toBe('function');
  });

  it('debería retornar un array con objetos', () => {
    return functions.getMdLinks(userPath).then((links) => {
      expect(links).toEqual(mockLinks.arrMockLinks)
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

describe('Validar MD Links', () => {

  it.only('Llamar axios y devolver un status 200 cuando el link es Ok', () => {
    // const links = functions.getValidateMDLinks()
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
      status: 200
    }));

    // console.log(functions.getValidateMDLinks(mockLinks.arrMockLinks))
    return functions.getValidateMDLinks(mockLinks.arrMockLinks)
    .then((links) => {
      expect(links.length).toBe(8);
    })

    // expect(axios.get).toHaveBeenCalledTimes(8);

    // .then((link) => {
    //   console.log(link);
      // expect(links.length).toBe(8);
      // expect(links[0]).toEqual(mockLinks.arrMockValidate)
    // })
  })
})


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
