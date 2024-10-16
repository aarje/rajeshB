const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    level: 'debug',
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log', level: 'debug' }),
    ],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
});

module.exports = { logger };


