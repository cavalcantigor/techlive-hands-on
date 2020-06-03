import winston from 'winston';
import config from 'config';

const {
    createLogger,
    format: { json },
    transports: { Console },
} = winston;
const logger: winston.Logger = createLogger();

logger.add(
    new Console({
        format: json(),
        level: config.get('app.logLevel'),
    }),
);

export default logger;
