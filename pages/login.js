import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useCurrentUser } from '@/hooks'
import AuthenticationWrapper from '@/components/authentication-wrapper'
import { Input } from '@/components/input'
import Spinner from '@/components/spinner'

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
    <AuthenticationWrapper title="Digite seu email">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <Input type="email" id="email" label="Email" labelSrOnly required />
        <Input
          type="password"
          id="password"
          label="Senha"
          labelSrOnly
          required
        />
        <div>
          <button type="submit" className="relative w-full">
            {loading && (
              <Spinner className="absolute left-4 top-4 fill-current w-5" />
            )}
            Entrar
          </button>
        </div>
        <div>
          <Link href="/forget-password">
            <a>
              <button className="secondary w-full">Esqueceu a senha?</button>
            </a>
          </Link>
        </div>
        <div className="h-14">
          {errorMsg && (
            <span className="block rounded-md bg-red-100 text-red-800 text-center p-4">
              {errorMsg}
            </span>
          )}
        </div>
      </form>
    </AuthenticationWrapper>
  )
}

export default LoginPage
