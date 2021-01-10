import { useState } from 'react'
import nc from 'next-connect'
import Router from 'next/router'
import { database } from '@/middlewares'
import { findTokenByIdAndType } from '@/db'

import LoginWrapper from '@/components/login-wrapper'
import { Password } from '@/components/login-inputs'
import SpinnerButton from '@/components/spinner-button'
import Alert from '@/components/alert'

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
    <LoginWrapper title={valid && 'Defina uma nova senha'}>
      {valid ? (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Password />
          <SpinnerButton label="Definir senha" loading={loading} />
        </form>
      ) : (
        <Alert label="O link está expirado" className="danger" />
      )}
    </LoginWrapper>
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
