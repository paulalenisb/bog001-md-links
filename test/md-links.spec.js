const functions = require('../src/functions.js')
const mockLinks = require('./mockLinks.js')
const axios = require('axios');
// const MockAdapter = require('axios-mock-adapter');
const userPath = './test-file.md';
const noLinks = './test-nolink.md';
const noFile = './testt-nolink.md';
// const mockAxios = new MockAdapter(axios);
// const axiosSpy = jest.spyOn(axios, 'get');
// const successTest = jest.fn();

jest.mock('axios');

/*---------- test validar / axios de los links Md ----------*/

describe('Validar MD Links', () => {

  it.only('validate link with axios', () => {
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
        console.log(results);
      });

    // mockAxios.onAny().reply(200, {status: 200});

    // expect(functions.getValidateMDLinks(mockLinks.arrMockLinks)).resolves.toEqual({status: 200});

    // done();
    // console.log(functions.getValidateMDLinks({ successTest }))

    // return functions.getValidateMDLinks(mockLinks.arrMockLinks)
    // .then((result) => {
    //   console.log(result);
    //   expect(result).toEqual({status: 200})
    //   done()
    //   // expect(axiosSpy).toHaveBeenCalled();  // Success!
    //   // expect(successTest.mockAxios.calls[0][0]).toBe('success');  // Success!
    // })
  })

    // it.only('Llamar axios y devolver un status 200 cuando el link es Ok', () => {
  //   // const links = functions.getValidateMDLinks()
  //   jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
  //     status: 200
  //   }));

    // console.log(functions.getValidateMDLinks(mockLinks.arrMockLinks))
    // return functions.getValidateMDLinks(mockLinks.arrMockLinks)
    // .then((links) => {
    //   expect(links.length).toBe(8);
    // })

    // expect(axios.get).toHaveBeenCalledTimes(8);

    // .then((link) => {
    //   console.log(link);
      // expect(links.length).toBe(8);
      // expect(links[0]).toEqual(mockLinks.arrMockValidate)
    // })
  // })
})



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

  // it.only('validate link with axios',  async (done) => {


