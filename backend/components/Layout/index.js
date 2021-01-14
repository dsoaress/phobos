import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import tw from 'twin.macro'

import Meta from '@/components/Meta'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoginForm from '@/components/LoginForm'
import SpinnerScreen from '@/components/SpinnerScreen'
import { useCurrentUser } from '@/hooks'

import locales from '@/locales'

export default function Layout({ children }) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const [user] = useCurrentUser()
  const [routeLoading, setRouteLoading] = useState(false)

  useEffect(() => {
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

  if (!user) {
    return (
      <LoginForm
        title={t.login.title}
        buttonLabel={t.login.buttonLabel}
        hasLogin
      />
    )
  }
  return (
    <>
      <Meta />
      <Header />
      <main css={[tw`pb-20`]}>
        {routeLoading ? <SpinnerScreen /> : children}
      </main>
      <Footer />
    </>
  )
}
