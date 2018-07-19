type Options = {
  ignoreErrors?: boolean
  errorCb?: (error: Error) => void
}

type Output = {
  start: (ttl?:number) => Output,
  startNow: () => Output,
  stop: () => void,
  restart: (ttl?: number) => Output,
  restartNow: () => Output,
}

declare type interval = (fn: () => ?number, initialTTL: number, options?: Options) => Output;

export default interval;