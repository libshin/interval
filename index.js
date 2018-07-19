class Timeout {
  constructor(fn, interval) {
    this.id = setTimeout(fn, interval);
    this.cleared = false;
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.cleared = true;
    clearTimeout(this.id);
  }
}

const defaultOptions = {
  ignoreErrors: true
};

const interval = (fn, initialTTL, options = defaultOptions, output = {}) => {
  const getTimeout = ttl => {
    const timeout = new Timeout(async () => {
      let TTL;
      try {
        if (timeout.cleared) {
          return;
        }
        TTL = await Promise.resolve(fn());
      } catch (error) {
        if (options.ignoreErrors) {
          console.error(error);
          TTL = initialTTL;
        } else {
          throw error;
        }
      }
      if (timeout.cleared) {
        return;
      }
      const nextTTL = parseInt(TTL, 10) || initialTTL;
      interval(fn, nextTTL, options, output);
    }, ttl);
    return timeout;
  };

  const getOutput = timeout => {
    const stop = () => {
      if (timeout) {
        timeout.clear();
      }
    };
    return {
      start: ttl => {
        if (timeout && !timeout.cleared) {
          throw new Error("Interval is already started");
        }
        const newOutput = getOutput(getTimeout(ttl || initialTTL));
        Object.assign(output, getOutput(newOutput));
        return output;
      },
      startNow: () => {
        if (timeout && !timeout.cleared) {
          throw new Error("Interval is already started");
        }
        Object.assign(output, getOutput(getTimeout(0)));
        return output;
      },
      stop,
      restart: ttl => {
        stop();
        Object.assign(output, getOutput(getTimeout(ttl || initialTTL)));
        return output;
      },
      restartNow: () => {
        stop();
        Object.assign(output, getOutput(getTimeout(0)));
        return output;
      }
    };
  };

  if (Object.keys(output).length === 0) {
    Object.assign(output, getOutput(null));
  } else {
    Object.assign(output, getOutput(getTimeout(initialTTL)));
  }
  return output;
};

export default interval;
