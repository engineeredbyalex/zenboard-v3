// importing styles
import '@/styles/globals.css'
// importing auth provider
import AuthProvider from './providers';



export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <AuthProvider>
      
        <link rel="icon" href="" sizes="any" />
        <Component {...pageProps} />
   
    </AuthProvider>
  );
}