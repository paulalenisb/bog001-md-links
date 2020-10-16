const mockMdLinks = require('./mockMdLinks.js');
const mdLinks = require('../src/mdlinks.js');
// eslint-disable-next-line max-len
const userPath = 'C:/Users/Lenovo/Documents/PL/2020/Laboratoria/Bootcamp/bog001-md-links/test2/test-file2.md';
const wrongPath = './testt-nolink.md';
const pathRecursion = 'test';

const mock = {
  get: jest.fn(),
};

/* ---------- Test función mdlinks ----------*/
describe('mdLinks', () => {
  it('Deberia ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Deberia leer los archivos md y retornar un array de objetos {href, text, file}', () => mdLinks(userPath, { validate: false }).then((links) => {
    expect(links).toHaveLength(8);
    expect(links).toEqual(mockMdLinks.arrMockMdLinks);
  }));

  it('Deberia leer los archivos .md de un directorio (recursión)', () => mdLinks(pathRecursion, { validate: false }).then((links) => {
    expect(links).toHaveLength(24);
  }));

  it('Deberia retornar error, cuando el path es invalido', () => {
    expect(() => {
      mdLinks(wrongPath, { validate: false });
    }).toThrow('Path invalido, verificar path');
  });

  it('Deberia validar, el array de objetos', () => {
    mock.get.mockImplementationOnce(() => Promise.resolve({ status: 200, ok: true }));
    mdLinks(userPath, { validate: true })
      .then((data) => {
        expect(data).toEqual(mockMdLinks.arrMockValidate);
      });
  });
});
