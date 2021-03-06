import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useUser = () => ({ user: null, loading: false });

export default function Homepage() {
   const { user, loading } = useUser();
   const router = useRouter();

   useEffect(() => {
      if (!(user || loading)) {
         router.push('/login');
      } else {
         router.push('/dashboard');
      }
   }, [user, loading]);

   return <p>Redirecting...</p>;
}
