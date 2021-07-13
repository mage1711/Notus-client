import '../styles/tailwind.css'
import { AppProps } from 'next/app'
import NavBar from '../Components/NavBar'
import Axios from 'axios'

import { useRouter } from 'next/router'
import { AuthProvider } from '../context/auth';
import { SWRConfig } from 'swr'
import ResponsiveNavBar from '../Components/ResponsiveNav'

// Axios.defaults.baseURL = 'http://localhost:7000/api'
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
        dedupingInterval: 8000,
      }}
    >

      <AuthProvider>
        {isNav && <ResponsiveNavBar/>}
        <div className={!isNav ? '' : 'pt-12'}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  )
}


export default App