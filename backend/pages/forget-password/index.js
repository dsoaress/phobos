import { useState } from 'react'
import { useRouter } from 'next/router'

import LoginForm from '@/components/LoginForm'

import locales from '@/locales'

const ForgetPasswordPage = () => {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

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
        label: t.forgatPasswordPage.message,
        type: 'success'
      })
    } else {
      setMessage({
        label: t.forgatPasswordPage.errorMessage,
        type: 'danger'
      })
    }
    setLoading(false)
  }

  return (
    <LoginForm
      title={t.forgatPasswordPage.title}
      email
      buttonLabel={t.forgatPasswordPage.buttonLabel}
      hasForgatPassword={false}
      message={message}
      onSubmit={handleSubmit}
      isLoading={loading}
    />
  )
}

export default ForgetPasswordPage
