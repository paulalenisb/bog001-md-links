const axios = require('axios');
const functions = require('../src/functions.js');
const mockLinks = require('./mockLinks.js');
// const mdLinks = require('../src/mdlinks.js');

// eslint-disable-next-line max-len
const userPath = 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test/test-file.md';
const dirPath = 'test';
// const noLinks = './test-nolink.md';
const noFile = './testt-nolink.md';
jest.mock('axios');

/* ---------- Test recursión----------*/
describe('Verificar recursión e identificar .md file', () => {
  it('Deberia ser una función', () => {
    expect(typeof functions.getMdFile).toBe('function');
  });

  it('Deberia retornar un array con las rutas de los archivos de un directorio', () => {
    expect(functions.getMdFile(dirPath)).toEqual(mockLinks.arrMockDirPath);
  });
});

/* ---------- Test para extraer links Md ----------*/
describe('Obtener MD Links', () => {
  it('debería ser una función', () => {
    expect(typeof functions.getMdLinks).toBe('function');
  });

  it('debería retornar un array con objetos', () => functions.getMdLinks(userPath).then((links) => {
    expect(links).toEqual(mockLinks.arrMockLinks);
  }));

  it('Mostrar mensaje de error cuando no hay links en un archivo', () => functions.getMdLinks(noFile).catch((e) => {
    expect(e.message).toBe('Verificar ruta, no se encontró el archivo');
  }));
});

/* ---------- Test validar / axios de los links Md ----------*/
describe('Validar MD Links', () => {
  it('validate link with axios', () => {
    // eslint-disable-next-line no-underscore-dangle
    axios.__setResponses([
      { status: 200 },
      { status: 404 },
      new Error('Blah!'),
    ]);

    return functions.getValidateMDLinks([
      { href: 'http://omg.ftw/', text: 'OMG', userPath: '/oh/my/god.md' },
      { href: 'http://example.com/', text: 'OMG', userPath: '/oh/my/god.md' },
      { href: 'http://example.net/', text: 'OMG', userPath: '/oh/my/god.md' },
    ])
      // eslint-disable-next-line no-unused-vars
      .then((results) => {
        // console.log(results);
      });
  });
});
