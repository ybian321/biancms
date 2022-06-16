import { omitBy } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { IResponse, ListResponse, Paginator } from '../../lib/model/api.type';

export function useListEffect<P, T extends ListResponse, U = any>(
   apiFn: (req) => Promise<IResponse<ListResponse>>,
   sourceKey,
   onlyFresh = true,
   params
) {
   const [data, setData] = useState([]);
   const [paginator, setPaginator] = useState<Paginator>({ page: 1, limit: 20 });
   const [total, setTotal] = useState<number>(0);
   const [loading, setLoading] = useState<boolean>(true);
   const [hasMore, setHasMore] = useState<boolean>(true);

   // ??
   const request = useCallback(apiFn, []);
   const stringParams = JSON.stringify(params || {});

   useEffect(() => {
      setLoading(true);

      const req = omitBy({ ...paginator, ...(params || {}) }, (item: string | number | boolean | null) => item === '' || item === null) as any;

      // ??
      request(req).then((res) => {
         const { data: newData } = res;
         const fresh = newData[sourceKey as string] as unknown as U[];
         const source = onlyFresh ? fresh : [...data, ...fresh];

         setData(source);
         setTotal(newData.total);
         setHasMore(onlyFresh ? !!source.length && source.length < newData.total : newData.total > source.length);
         setLoading(false);
      });
   }, [paginator, stringParams]);

   return {
      data,
      setData,

      paginator,
      setPaginator,

      total,
      setTotal,

      loading,
      setLoading,

      hasMore
   };
}
