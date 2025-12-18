import pino from "pino";

const Logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  level: "info",
});

(globalThis as any).logger = Logger;

export default Logger;