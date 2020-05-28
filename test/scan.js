const astraea = require('../index.js');
const path = require('path');

astraea.scan({
  inputDir: path.resolve(__dirname, './scanData'),
  outputDir: path.resolve(__dirname, '../example/scan'),
  request: {
    optional: true,
  },
  response: {},
});