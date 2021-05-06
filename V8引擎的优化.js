// ! js引擎在解析代码时会进行优化，对for循环里的相同代码优化将会大大缩小运行时间，但是当js引擎发现15行有不同参数的计算时，则将放弃原本的优化，延长运行时间。
const { performance, PerformanceObserver } = require('perf_hooks')

const add = (a, b) => a + b

const num1 = 1
const num2 = 2

performance.mark('start')

for (let index = 0; index < 1000000; index++) {
  add(num1, num2)
}

add(num1, 'foo')

for (let index = 0; index < 100000; index++) {
  add(num1, num2)
}

performance.mark('end')

const observer = new PerformanceObserver(list => {
  console.log(list.getEntries()[0]);
})

observer.observe({ entryTypes: ['measure'] })

performance.measure('测量结果：', 'start', 'end')