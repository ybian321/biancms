import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
   const currentUrl = useRouter().pathname;
   if (currentUrl.includes('dashboard')) {
      return (
         <DashboardLayout>
            <Component {...pageProps} />
         </DashboardLayout>
      );
   } else {
      return <Component {...pageProps} />;
   }
}
