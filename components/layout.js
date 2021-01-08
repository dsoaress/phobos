import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Meta from '@/components/meta'
import Header from '@/components/header'
import SplashScreen from '@/components/splash-screen'
import { useCurrentUser } from '@/hooks'

export default function Layout({ children, title }) {
  const [user] = useCurrentUser()
  const [routeLoading, setRouteLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // todo: fix redirect
    !user && router.push('/login')
    const start = () => {
      setRouteLoading(true)
    }
    const end = () => {
      setRouteLoading(false)
    }
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <>
      <Meta />
      <Header title={title} />
      <main>{routeLoading ? <SplashScreen /> : children}</main>
    </>
  )
}
