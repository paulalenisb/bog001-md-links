const functions = require('../src/functions.js')
const mockLinks = require('./mockLinks.js')
const axios = require('axios');
const userPath = 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md';
const noLinks = './test-nolink.md';
const noFile = './testt-nolink.md';
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

/*---------- Test validar / axios de los links Md ----------*/
describe('Validar MD Links', () => {

  it('validate link with axios', () => {
    axios.__setResponses([
      { status: 200 },
      { status: 404 },
      new Error('Blah!'),
    ]);

    return functions.getValidateMDLinks([
      { href: 'http://omg.ftw/', text: 'OMG', userPath: '/oh/my/god.md' },
      { href: 'http://example.com/', text: 'OMG', userPath: '/oh/my/god.md' },
      { href: 'http://example.net/', text: 'OMG', userPath: '/oh/my/god.md' }
    ])
      .then((results) => {
        // console.log(results);
      });
  })
})

/*---------- Test función validate ----------*/
describe('Comprobar función MD Links', () => {
  it ('', () => {
    
  })
})
