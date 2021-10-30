const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'CRMJAX API documentation',
    version: '1.0',
    license: {
      name: 'Mayank Kapri',
      url: 'https://github.com/rulerzz',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
    },
  ],
};

module.exports = swaggerDef;