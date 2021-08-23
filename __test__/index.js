const path = require('path');
const { Astraea } = require('../lib/index');

const astraea = new Astraea({
   sourceDir: path.resolve(__dirname, '../examples/sources'),
   typingDir: path.resolve(__dirname, '../examples/routes'),
});

astraea.start();