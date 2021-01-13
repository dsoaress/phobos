import { useState } from 'react'
import nc from 'next-connect'
import { database } from '@/middlewares'
import { findTokenByIdAndType } from '@/db'

import LoginForm from '@/components/LoginForm'

const ResetPasswordTokenPage = ({ valid, token }) => {
  const [message, setMessage] = useState({})
  const [loading, setLoading] = useState(false)
  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage({})

    const body = {
      password: event.currentTarget.password.value,
      token
    }

    const res = await fetch('/api/user/password/reset', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (res.status === 200) {
      setMessage({
        label: 'Senha alterada com sucesso. Você pode fechar essa janela',
        type: 'success'
      })
    } else {
      setMessage({
        label: 'Ocorreu um erro interno. Tente novamente',
        type: 'danger'
      })
    }
  }

  return (
    <LoginForm
      title={valid ? 'Defina uma nova senha' : 'O link está expirado'}
      password
      buttonLabel="Definir senha"
      hasForgatPassword={false}
      message={message}
      onSubmit={handleSubmit}
      isLoading={loading}
    />
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
