const tree = [
  {
    title: 'Car',
    subNav: [
      {
        title: 'HONDA',
        path: 'honda',
        subNav: [
          {
            title: 'DONGFENG',
            path: 'dongfeng',
            subNav: [
              { title: 'NSPIRE', path: 'nspire' },
              { title: 'ENVIX', path: 'envix' },
              { title: 'CIVIC', path: 'civic' }
            ]
          },
          {
            title: 'GUANGQI',
            path: 'guangqi',
            subNav: [
              { title: 'AVANCIER', path: 'avancier' },
              { title: 'ACCORD', path: 'accord' }
            ]
          }
        ]
      },
      {
        title: 'TOYOTA',
        path: 'toyota',
        subNav: [
          { title: 'COROLLA', path: 'corolla' },
          { title: 'CAMRY', path: 'camry' },
          { title: 'PRADO', path: 'prado' },
          { title: 'ALPHARD', path: 'alphard' }
        ]
      }
    ],
    path: 'car'
  },
  {
    title: 'Area',
    path: 'area',
    subNav: [
      {
        title: 'NORTH',
        path: 'north',
        subNav: [
          { title: 'BEIJING', path: 'beijing' },
          { title: 'CHANGCHU', path: 'changchu' }
        ]
      },
      {
        title: 'SOUTH',
        path: 'south',
        subNav: [
          { title: 'SHANGHAI', path: 'shanghai' },
          { title: 'GUANGZHOU', path: 'guangzhou' }
        ]
      }
    ]
  },
  {
    title: 'Country',
    path: 'country',
    subNav: [
      {
        title: 'CHINA',
        path: 'china',
        subNav: [
          { title: 'MAINLAND', path: 'mainland' },
          { title: 'TAIWAN', path: 'taiwan' }
        ]
      },
      { title: 'American', path: 'american' }
    ]
  }
];

//Recursive Solution !=loop 只要有子问题一切皆可递归
//https://blog.csdn.net/u012403290/article/details/69054185
//https://segmentfault.com/a/1190000040308406

//1：fibonacci
function fibonacci(n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}
fibonacci(30);

//虚拟内存有限 递归爆栈 --> 动态规划解决 --> 前一个问题的答案是后一个问题的一个解
function fib(num) {
  if (num < 2) {
    return num;
  }

  const memo = [0n, 1n]; //面向对象tuple: [1,2] --> [2,3] --> [3,5] --> [5,8] --->
  //1n: bigint
  //表示的最大数字 2^52 - 1 双精度浮点型 IEEE745

  for (let i = 2; i <= num; i++) {
    const result = memo[0] + memo[1]; //1
    memo[0] = memo[1]; //[1n,1n] --> [1,2]
    memo[1] = result; //[1n,1] --> [2,3]
  }
  return memo[1];
}

fib(2000);

//2：deep clone
function clone(obj) {
  //终止条件
  if (typeof obj !== 'object') {
    return obj;
  }

  //如何计算
  const newObj = {};

  //缩小问题
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      newObj[key] = clone(value);
    }
  }

  return newObj;
}
//处理node list/类数组对象[1, {a:"b"}]： 数字索引+length
Array.prototype.filter.call(value, () => {});
Array.prototype.filter.apply(value, () => {});

//2.5: hanota 1:24
const a = [1, 2, 3, 4, 5, 6];
const b = [];
const c = [];

//3. tree
// const dfs(){
//描述思路-->编写代码
// }
// const bfs(){}

//3.5 array length
const arrayLength = (arr) => {
  if (arr[0] == undefined) return 0;
  else return 1 + arrayLength(arr.slice(1));
};
