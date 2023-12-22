import { Server } from 'http';
import app from './app';
import subscribeToEvents from './app/events';
import config from './config';
import { errorLog, infoLog } from './shared/logger';
import { RedisClient } from './shared/redis';


async function bootstrap() {
  await RedisClient.connect().then(() => {
    subscribeToEvents()
  });
  const server: Server = app.listen(config.port, () => {
    infoLog.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {

    if (server) {
      server.close(() => {
        infoLog.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorLog.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

}

bootstrap();