const crypto = require('crypto');

// In the Webpack config
module.exports = {
  // other configurations...
  output: {
    // other output configurations...
    hashFunction: 'sha256',
  },
};
