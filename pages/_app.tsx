import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '../components/Footer'

/* Dummy div para forçar o Tailwind a incluir classes usadas em @apply no CSS */
function TailwindSafeClasses() {
  return (
    <div className="hidden text-blue-500 text-blue-600 text-pink-500 text-pink-600"></div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <TailwindSafeClasses />
    <Component {...pageProps} />
    <Footer />
  </>
} 