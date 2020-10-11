#!/usr/bin/env node
const mdLinks = require('../src/mdlinks.js');
const getStatsMDLinks = require('../src/statsValidate.js');
const { program } = require('commander');
const route = process.argv[2];
const isValidate = true;

program
  .version('0.0.1')
  .option('-v, --validate', 'returns all validate links in .md files')
  .option('-s, --stats', 'returns total and unique stats of the links')
  .option('-v -s, --validate --stats', 'returns total, unique, broken and ok')
  .option('-s -v, --stats --validate', 'Returns total, unique, broken and ok')

program.parse(process.argv);

// Si solo paso el path
if (!program.validate && !program.stats) {
  mdLinks(route, {validate:false}).then(res => console.log(res))
  .catch((err) => console.error(err))
}

//Si paso path --validate
if (program.validate && !program.stats) {
  mdLinks(route, {validate:true}).then(res => console.log(res))
  .catch((err) => console.error(err))
}

//Si paso path --stats
if (!program.validate && program.stats) {
    mdLinks(route, {validate:false}).then(res => {
    const onlyStats = getStatsMDLinks(res);
    console.log(onlyStats)
  })
  .catch((err) => console.error(err))
}

//Si paso path --stats --validate
if (!!program.validate && !!program.stats){
  mdLinks(route, {validate:true}).then(res => {
    console.log(getStatsMDLinks(res, isValidate))
  })
  .catch((err) => console.error(err))
}

