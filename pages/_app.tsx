import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import '../styles/globals.css';
import DashboardLayout from '../components/layout/DashboardLayout';
import { MessageProvider } from '../components/provider';

export default function MyApp({ Component, pageProps }: AppProps) {
   const currentUrl = useRouter().pathname;
   if (currentUrl.includes('dashboard')) {
      return (
         <MessageProvider>
            <DashboardLayout>
               <Component {...pageProps} />
            </DashboardLayout>
         </MessageProvider>
      );
   } else {
      return (
         <>
            <Head>
               <meta charSet="utf-8" />
               <title>Online Education</title>
               <meta key="description" name="description" content="Online Education System" />
               {/* Distribution implementation by amap*/}
               {/* <script
                  src={`//webapi.amap.com/maps?v=1.4.15&key=${key}&plugin=Map3D,AMap.DistrictLayer `}
               ></script> */}
            </Head>
            <Component {...pageProps} />
         </>
      );
   }
}
