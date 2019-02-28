const astraea = require('../index.js');

astraea.json(
  {
    get: {
      '/api/persion/detail': {
        a: 1,
      },
      '/api/pet/detail': {
        a: 1,
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
  [
    'GET/api/persion/detail'
  ]
)