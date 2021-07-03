import '../styles/tailwind.css'
import { AppProps } from 'next/app'
import Navbar from '../Components/NavBar'
import Axios from 'axios'

import { useRouter } from 'next/router'
import { AuthProvider } from '../context/auth';
import { SWRConfig } from 'swr'

// Axios.defaults.baseURL = 'http://localhost:8000/api'
Axios.defaults.baseURL = 'https://notus-server-kzvek.ondigitalocean.app/api'
Axios.defaults.withCredentials = true
const fetcher = async (url: string) => {
  try {
    const res = await Axios.get(url)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}
function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const noNavRoutes = ['/register', '/login']
  const isNav = !noNavRoutes.includes(pathname)

  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,
      }}
    >
      <AuthProvider>
        {isNav && <Navbar />}
        <div className={!isNav ? '' : 'pt-12'}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  )
}


export default App