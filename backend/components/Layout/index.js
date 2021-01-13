import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Meta from '@/components/Meta'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoginForm from '@/components/LoginForm'
import SpinnerScreen from '@/components/SpinnerScreen'
import { useCurrentUser } from '@/hooks'

import * as S from './styled'

export default function Layout({ children }) {
  const [user] = useCurrentUser()
  const [routeLoading, setRouteLoading] = useState(false)
  const router = useRouter()

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
        title="Você não está logado(a)"
        buttonLabel="Fazer login"
        hasLogin
      />
    )
  }
  return (
    <>
      <Meta />
      <Header />
      <S.Main>{routeLoading ? <SpinnerScreen /> : children}</S.Main>
      <Footer />
    </>
  )
}
