import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useCurrentUser } from '@/hooks'
import LoginWrapper from '@/components/login-wrapper'
import { Email, Password } from '@/components/login-inputs'
import SpinnerButton from '@/components/spinner-button'
import Alert from '@/components/alert'

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [user, { mutate }] = useCurrentUser()
  useEffect(() => {
    if (user) router.push('/blog')
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      const userObj = await res.json()
      mutate(userObj)
    } else {
      setErrorMsg('Email ou senha incorretos')
      setLoading(false)
    }
  }

  return (
    <LoginWrapper title="Digite seu email">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <Email />
        <Password />
        <SpinnerButton label="Entrar" loading={loading} />
        <div>
          <Link href="/forget-password">
            <a>
              <button className="secondary w-full">Esqueceu a senha?</button>
            </a>
          </Link>
        </div>
        <div className="h-14">
          {errorMsg && <Alert label={errorMsg} className="danger" />}
        </div>
      </form>
    </LoginWrapper>
  )
}

export default LoginPage
