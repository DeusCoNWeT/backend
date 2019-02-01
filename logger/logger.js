

const {transports, createLogger, format} = require('winston');

const logger = createLogger({
    level: 'silly',
    format:format.combine(
        format.align(),
        format.timestamp(),
        format.printf(info =>`${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new transports.Console(),
      new transports.File({ filename: './logger/error.log', level: 'error' }),
      new transports.File({ filename: './logger/activity.log', level:'info' })
    ]
  });
  module.exports.logger=logger;