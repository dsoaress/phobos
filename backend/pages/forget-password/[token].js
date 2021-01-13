import { useState } from 'react'
import { useRouter } from 'next/router'
import nc from 'next-connect'

import { database } from '@/middlewares'
import { findTokenByIdAndType } from '@/db'
import LoginForm from '@/components/LoginForm'

import locales from '@/locales'

const ResetPasswordTokenPage = ({ valid, token }) => {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

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
        label: t.forgatPasswordToken.message,
        type: 'success'
      })
    } else {
      setMessage({
        label: t.forgatPasswordToken.errorMessage,
        type: 'danger'
      })
    }
  }

  return (
    <LoginForm
      title={
        valid ? t.forgatPasswordToken.title : t.forgatPasswordToken.altTitle
      }
      password
      buttonLabel={t.forgatPasswordToken.buttonLabel}
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
