import pino from "pino";

const Logger = pino({
  level: "info",
});

(globalThis as any).logger = Logger;

export default Logger;