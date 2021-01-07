import { useEffect, useState } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/client'

import Head from './head'
import Header from './header'

const SplashScreen = dynamic(() => import('./splash-screen'))

const Login = dynamic(() => import('./login'))

export default function Layout({ children, title }) {
  const [session, loading] = useSession()
  const [routeLoading, setRouteLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      setRouteLoading(true)
    }
    const end = () => {
      setRouteLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  if (typeof window !== 'undefined' && loading) return <SplashScreen />
  if (!session) return <Login />

  return (
    <>
      <Head />
      <Header title={title} />
      <main>{routeLoading ? <SplashScreen /> : children}</main>
    </>
  )
}
