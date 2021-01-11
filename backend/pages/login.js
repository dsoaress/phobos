import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import LoginForm from '@/components/LoginForm'
import { useCurrentUser } from '@/hooks'

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({})
  const [user, { mutate }] = useCurrentUser()
  useEffect(() => {
    if (user) router.push('/blog')
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage({})

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
      setMessage({
        label: 'Email ou senha incorretos',
        type: 'danger',
        show: true
      })
      setLoading(false)
    }
  }
  return (
    <LoginForm
      title="Digite seu email"
      email
      password
      buttonLabel="Entrar"
      hasForgatPassword={true}
      message={message}
      onSubmit={handleSubmit}
      isLoading={loading}
    />
  )
}

export default LoginPage
