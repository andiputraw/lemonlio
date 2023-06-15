import Logger from "$logger";

const logger = new Logger();
await logger.initFileLogger("log", {
  maxBytes: 10 * 1024,
  maxBackupCount: 10,
});
logger.disableConsole();

export default logger;
