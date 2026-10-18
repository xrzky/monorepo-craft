export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

export interface LoggerOptions {
  /** Label prefixed to every log line, e.g. "api". */
  name?: string;
  /** Minimum level to emit. Defaults to LOG_LEVEL or "info". */
  level?: LogLevel;
}

export interface Logger {
  readonly level: LogLevel;
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  child(name: string): Logger;
}

const priorities: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function readLevelFromEnv(): LogLevel | undefined {
  const env =
    "process" in globalThis
      ? (globalThis as { process?: { env?: Record<string, string | undefined> } })
          .process?.env
      : undefined;
  const value = env?.LOG_LEVEL?.toLowerCase();
  return LOG_LEVELS.find((level) => level === value);
}

function formatMeta(meta: Record<string, unknown> | undefined): string {
  if (!meta || Object.keys(meta).length === 0) {
    return "";
  }
  return ` ${JSON.stringify(meta)}`;
}

export function createLogger(options: LoggerOptions = {}): Logger {
  const level = options.level ?? readLevelFromEnv() ?? "info";
  const name = options.name;

  function emit(
    entryLevel: LogLevel,
    message: string,
    meta?: Record<string, unknown>,
  ): void {
    if (priorities[entryLevel] < priorities[level]) {
      return;
    }

    const line = `${new Date().toISOString()} ${entryLevel.toUpperCase()}${name ? ` [${name}]` : ""} ${message}${formatMeta(meta)}`;
    const write =
      entryLevel === "debug"
        ? console.debug
        : entryLevel === "info"
          ? console.info
          : entryLevel === "warn"
            ? console.warn
            : console.error;

    write(line);
  }

  return {
    level,
    debug: (message, meta) => emit("debug", message, meta),
    info: (message, meta) => emit("info", message, meta),
    warn: (message, meta) => emit("warn", message, meta),
    error: (message, meta) => emit("error", message, meta),
    child: (childName) =>
      createLogger({
        level,
        name: name ? `${name}:${childName}` : childName,
      }),
  };
}
