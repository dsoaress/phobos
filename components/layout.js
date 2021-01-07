import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/client'

import Head from './head'
import Header from './header'
import Footer from './footer'

const SplashScreen = dynamic(() => import('./splash-screen'))

const Login = dynamic(() => import('./login'))

export default function Layout({ children, title }) {
  const [session, loading] = useSession()

  if (typeof window !== 'undefined' && loading) return <SplashScreen />
  if (!session) return <Login />

  return (
    <>
      <Head />
      <Header title={title} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
