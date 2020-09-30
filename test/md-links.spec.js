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

// const arrMockLinks = require('../src/mdlinks')

describe('Obtener MD Links', () => {

  it('debería ser una función', () => {
      expect(typeof functions.getMdLinks).toBe('function');
  });

  



  // it('Retorna los personajes de Rick & Morty con async', async () => {
  //     const url = 'https://rickandmortyapi.com/api/character';
  //     const data = await getCharacters(url)
  //     expect(data.results).toHaveLength(20)
  // })

  // it('Retorna los personajes de Rick & Morty', () => {
  //     const url = 'https://rickandmortyapi.com/api/character';
  //     return getCharacters(url).then(data => {
  //         // console.log(data.results);
  //         expect(data.results).toHaveLength(20)
  //     })
  // })

  // test('Falla cuando la url está mal escrita', () => {
  //     //expect.assertions(1);
  //     return getCharacters('holi').catch(e => {
  //         //console.log(e.message); //Network Error
  //         expect(e.message).toBe('Network Error')
  //     });
  });






// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
