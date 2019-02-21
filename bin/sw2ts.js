#!/usr/bin/env node

const sw2ts = require('../index');
const path = require('path');
const program = require('commander');
const package = require('../package.json');
const consola = require('consola');
const fs = require('fs');

program
  .usage(`\r\n  ${package.description}\r\n  GithubID: ${package.author}\r\n  Repository: ${package.repository.url}`)
  .option('-o, --output <value>', 'output dirname')
  .option('-i, --input <value>', 'swagger.json path')
  .version(package.version)

program
  .command('init')
  .action(() => {
    if (!program.input) {
      consola.error('please set -i eg: ./swagger.json');
      return;
    }
    const input = path.resolve(process.cwd(), program.input);
    const output = path.resolve(process.cwd(), program.output || './');

    const swagger = fs.readFileSync(input);
    sw2ts(JSON.parse(swagger), output);
    consola.info('success! outdir: ', output);
  })

program.parse(process.argv);