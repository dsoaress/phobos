import { useState } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/client'

import AuthenticationWrapper from './authentication-wrapper'
import { Input } from './input'
import Spinner from './spinner'
import useForm from '../hooks/use-form'

export default function Login() {
  const [{ values }, handleChange, handleSubmit] = useForm()
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_URL}/api/user`,
        data: values
      })
      res.status === 200
        ? signIn('email', values)
        : (setErrorMessage('Parece que você não tem autorização de acesso'),
          setLoading(false))
    } catch (error) {
      setErrorMessage('Por favor tente novamente')
      setLoading(false)
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
