const obj = [
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
console.log(obj);

//https://www.cnblogs.com/yuer20180726/p/11377897.html 遍歷爲什麽需要拷貝？
export function deepSearch(props: string) {
  const objValues = Object.values(obj);
  console.log(objValues);
}

export function breadthSearch(props: string) {}

//https://segmentfault.com/a/1190000040308406
export function fibonacci(n: any) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}
