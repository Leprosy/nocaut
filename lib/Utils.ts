export const executeWait = (cb: Function, delay: number) => {
  return new Promise((resolve) => {
    cb();
    setTimeout(() => resolve(true), delay);
  });
};
