import Head from 'next/head'
import Navbar from './Navbar'
import { useFetchUser, UserProvider } from '../utils/user'

const Layout = ({ user, loading = false, children }) => (
    <UserProvider value={{ user, loading }}>
        <Head><title>Message Board</title></Head>
        <Navbar />
        {children}
    </UserProvider>
)

export default Layout