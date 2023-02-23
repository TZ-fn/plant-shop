import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from 'store/store';
import Layout from 'components/Layout/Layout';
import 'styles/globals.css';
import 'styles/variables.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        session={pageProps.session}
      >
        <ToastContainer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
