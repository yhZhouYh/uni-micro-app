const sleep = function<T> (data: T, ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, ms)
  })
}

export {
  sleep,
}
