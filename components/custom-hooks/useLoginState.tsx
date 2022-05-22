import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useLoginState() {
   const router = useRouter();

   useEffect(() => {
      const token = localStorage?.getItem('token');
      const role = localStorage?.getItem('role');

      const path = router.asPath;
      const currentRole = path.split('/').slice(2, 3);

      if (!token) {
         router.push('/login', undefined, { shallow: true });
      }

      if (role !== currentRole.toString()) {
         router.push(`/dashboard/${role}`, undefined, { shallow: true });
      }
   }, []);
}
