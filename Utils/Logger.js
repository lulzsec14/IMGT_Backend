import logger from "pino";
import dayjs from "dayjs";
// import config from "config";

// const level = config.get("logLevel");

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level: "info",
  base: { pid: false },
  timestamp: () => `,"time":" ${dayjs().format()}"`,
});

export default log;
