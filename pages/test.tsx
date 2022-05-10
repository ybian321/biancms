import { breadthSearch, deepSearch, fibonacci } from '../lib/util/test';

function test() {
  const value = 'china';
  const n = 30;

  console.log(deepSearch(value));
  console.log(breadthSearch(value));
  const fib = fibonacci(n);
  console.log(fib);
  return;
}

export default test;
