import { useState } from 'react'
import nc from 'next-connect'
import Router from 'next/router'
import { database } from '@/middlewares'
import { findTokenByIdAndType } from '@/db'

import AuthenticationWrapper from '@/components/authentication-wrapper'
import { Input } from '@/components/input'
import Spinner from '@/components/spinner'

const ResetPasswordTokenPage = ({ valid, token }) => {
  const [loading, setLoading] = useState(false)
  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    const body = {
      password: event.currentTarget.password.value,
      token
    }

    const res = await fetch('/api/user/password/reset', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (res.status === 200) Router.replace('/')
  }

  return (
    <AuthenticationWrapper title={valid && 'Defina uma nova senha'}>
      {valid ? (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              Definir senha
            </button>
          </div>
        </form>
      ) : (
        <div className="h-14">
          <span className="block rounded-md bg-red-100 text-red-800 text-center p-4">
            O link está expirado
          </span>
        </div>
      )}
    </AuthenticationWrapper>
  )
}

export async function getServerSideProps(ctx) {
  const handler = nc()
  handler.use(database)
  await handler.run(ctx.req, ctx.res)
  const { token } = ctx.query

  const tokenDoc = await findTokenByIdAndType(
    ctx.req.db,
    ctx.query.token,
    'passwordReset'
  )

  return { props: { token, valid: !!tokenDoc } }
}

export default ResetPasswordTokenPage
