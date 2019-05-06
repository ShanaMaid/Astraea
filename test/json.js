const astraea = require('../index.js');

astraea.json(
  {
    get: {
      '/api/persion/detail': {
        a: 1,
      },
      '/api/pet/detail': {
        a: null,
      }
    },
    post: {
      '/api/persion/create': () => [{
        a: 1,
        b: [
          {
            v: 1
          }
        ]
      }],
    }
  }, 
  './example/json', 
  {
    blackList: ['DELETE/pet/:petId'],
    optional: true,
  }
)