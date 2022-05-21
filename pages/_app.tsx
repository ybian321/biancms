import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Dashboard from '../components/Dashboard';

function MyApp({ Component, pageProps }: AppProps) {
   const currentUrl = useRouter().asPath;
   if (currentUrl.includes('dashboard')) {
      return (
         <Dashboard>
            <Component {...pageProps} />
         </Dashboard>
      );
   } else {
      return <Component {...pageProps} />;
   }
}

export default MyApp;
