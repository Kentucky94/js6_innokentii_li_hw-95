const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  port: 8080,
  uploadPath: path.join(rootPath, 'public'),
  database: 'mongodb://localhost/cocktail-app',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  facebook: {
    appId: '2999393443460276',
    appSecret: 'c83bed40848ee6e30d40baf2e17636b2'
  }
};