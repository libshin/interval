# TL;DR

Create flexible intervals

## How to use

```js
import interval from "@libshin/interval";

// interval(fn: () => ?number, initialTTL: number, options)
const timer = interval(fn, 500);

// The timer is defined

timer.start(); // Start it (1st call of fn in 500ms)
timer.startNow(); // Start timer and immediately calls fn
timer.stop(); // When the timer is running
timer.restart(); // Stops timer and calls start()
timer.restartNow(); // Stops timer and calls startNow()
```

## Why flexible?

The main difference with regular `setTimeout` in JS is that if the callback function `fn` returns a number, it will be the new time interval before the next call of `fn`.

```js
import interval from "@libshin/interval";

const fn = () => {
  console.log('fn is called')
  return 1500;
}

const timer = interval(fn, 500);

timer.start()

> "fn is called" // after 500ms
> "fn is called" // after 1500ms
> "fn is called" // after 1500ms
> "fn is called" // after 1500ms
...
```

Furthermore, `start` and `restart` can take a initial ttl:

```js
import interval from "@libshin/interval";

const fn = () => {
  console.log('fn is called')
}

const timer = interval(fn, 500);

timer.start(1500)

> "fn is called" // after 1500ms
> "fn is called" // after 500ms
> "fn is called" // after 500ms
> "fn is called" // after 500ms
...
```
