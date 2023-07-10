import { AppProps } from 'next/app'
import '../styles/index.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
