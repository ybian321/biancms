interface Route {
   path: string;
   breadcrumbName: string;
   children: Array<{
      path: string;
      breadcrumbName: string;
   }>;
}

export function deepClone(data: any, map = new Map()) {
   if (typeof data === 'object' && data !== null) {
      const result: Route = JSON.parse(JSON.stringify(data));
      return result;
   } else {
      return data;
   }
}
