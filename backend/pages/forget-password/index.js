import { useState } from 'react'

import LoginWrapper from '@/components/login-wrapper'
import { Email } from '@/components/login-inputs'
import SpinnerButton from '@/components/spinner-button'
import Alert from '@/components/alert'

const ForgetPasswordPage = () => {
  const [msg, setMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault(e)
    setLoading(true)
    setMsg('')
    setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value
    }

    const res = await fetch('/api/user/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (res.status === 200) {
      setMsg('Verifique sua caixa de entrada')
    } else {
      setErrorMsg('Erro. Por favor, tente novamente')
    }
    setLoading(false)
  }

  return (
    <LoginWrapper title="Digite seu email para recuperar o acesso">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <Email />
        <SpinnerButton label="Enviar" loading={loading} />
        <div className="h-14">
          {msg && <Alert label={msg} className="success" />}
          {errorMsg && <Alert label={errorMsg} className="warning" />}
        </div>
      </form>
    </LoginWrapper>
  )
}

export default ForgetPasswordPage
