import { useState } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/client'

import AuthenticationWrapper from './authentication-wrapper'
import { Input } from './input'
import useForm from '../hooks/use-form'

export default function Login() {
  const [{ values, loading }, handleChange, handleSubmit] = useForm()
  const [errorMessage, setErrorMessage] = useState(null)

  const login = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_URL}/api/user`,
        data: values
      })
      res.status === 200
        ? signIn('email', values)
        : setErrorMessage('Parece que você não tem autorização de acesso')
    } catch (error) {
      setErrorMessage('Por favor tente novamente')
    }
  }

  return (
    <AuthenticationWrapper title="Digite seu email">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(login)}>
        <Input
          type="email"
          id="email"
          label="Email"
          onChange={handleChange}
          labelSrOnly
        />
        <div>
          <button type="submit" className="w-full">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
        <div className="h-14">
          {errorMessage && (
            <span className="block rounded-md bg-red-100 text-red-800 text-center p-4">
              {errorMessage}
            </span>
          )}
        </div>
      </form>
    </AuthenticationWrapper>
  )
}
