const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;
// initialise mongoose database and start the http server
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

// exit handeller for stopping server after handelling exceptions
const exitHandler = () => {
  if (server) {
    server.close(() => { logger.info('Server closed'); process.exit(1); });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

// catching uncaughtException , unhandledRejection and calling unexpectedErrorHandler to terminate the current process instance
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// listening to terminal generated signals ex. CRTL + C is SIGINT  
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

process.on('SIGINT', () => {
  logger.info('SIGINT received');
  if (server) {
    server.close();
  }
});