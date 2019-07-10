const astraea = require('../index.js');
const swagger = require('./swagger.json');
astraea.swagger(
  swagger, 
  './example/swagger', 
  {
    blackList: [],
  }
)