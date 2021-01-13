import { useState } from 'react'

import LoginForm from '@/components/LoginForm'

const ForgetPasswordPage = () => {
  const [message, setMessage] = useState({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault(e)
    setLoading(true)
    setMessage({})

    const body = {
      email: e.currentTarget.email.value
    }

    const res = await fetch('/api/user/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (res.status === 200) {
      setMessage({
        label: 'Verifique sua caixa de entrada',
        type: 'success'
      })
    } else {
      setMessage({
        label: 'Erro. Por favor, tente novamente',
        type: 'danger'
      })
    }
    setLoading(false)
  }

  return (
    <LoginForm
      title="Digite seu email para recuperar o acesso"
      email
      buttonLabel="Enviar"
      hasForgatPassword={false}
      message={message}
      onSubmit={handleSubmit}
      isLoading={loading}
    />
  )
}

export default ForgetPasswordPage
