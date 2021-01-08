import { useState } from 'react'

import AuthenticationWrapper from '@/components/authentication-wrapper'
import { Input } from '@/components/input'
import Spinner from '@/components/spinner'

const ForgetPasswordPage = () => {
  const [msg, setMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault(e)
    setLoading(true)

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
    <AuthenticationWrapper title="Digite seu email para recuperar o acesso">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <Input type="email" id="email" label="Email" labelSrOnly required />
        <div>
          <button type="submit" className="relative w-full">
            {loading && (
              <Spinner className="absolute left-4 top-4 fill-current w-5" />
            )}
            Enviar
          </button>
        </div>
        <div className="h-14">
          {msg && (
            <span className="block rounded-md bg-green-100 text-green-800 text-center p-4">
              {msg}
            </span>
          )}
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

export default ForgetPasswordPage
