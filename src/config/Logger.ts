type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";

const LEVEL_VALUES: Record<LogLevel, number> = {
  fatal: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
  trace: 10,
  silent: 0,
};

interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
  timestamp?: boolean;
}

class FastLogger {
  private levelValue: number;
  private prefix: string;
  private timestamp: boolean;

  private buffer = "";
  private flushing = false;

  constructor(options: LoggerOptions = {}) {
    this.levelValue = LEVEL_VALUES[options.level ?? "info"];
    this.prefix = options.prefix ? `[${options.prefix}] ` : "";
    this.timestamp = options.timestamp ?? true;
  }

  private flush() {
    this.flushing = false;
    if (this.buffer.length === 0) return;
    process.stdout.write(this.buffer);
    this.buffer = "";
  }

  private write(level: LogLevel, msg: string) {
    if (LEVEL_VALUES[level] < this.levelValue) return;

    let line = "";

    if (this.timestamp) {
      line += Date.now().toString() + " ";
    }

    line += this.prefix;
    line += level.toUpperCase();
    line += " ";
    line += msg;
    line += "\n";

    this.buffer += line;

    if (!this.flushing) {
      this.flushing = true;
      setImmediate(() => this.flush());
    }
  }

  fatal(msg: string) { this.write("fatal", msg); }
  error(msg: string) { this.write("error", msg); }
  warn(msg: string)  { this.write("warn", msg); }
  info(msg: string)  { this.write("info", msg); }
  debug(msg: string) { this.write("debug", msg); }
  trace(msg: string) { this.write("trace", msg); }

  setLevel(level: LogLevel) {
    this.levelValue = LEVEL_VALUES[level];
  }
}

(globalThis as any).logger = new FastLogger({
  level: "info",
  prefix: "GamesAPI",
  timestamp: true,
});
