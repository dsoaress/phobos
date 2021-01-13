import { useState } from 'react'
import { useRouter } from 'next/router'
import nc from 'next-connect'

import { all } from '@/middlewares'
import { updateUserById, findAndDeleteTokenByIdAndType } from '@/db'
import LoginForm from '@/components/LoginForm'

import locales from '@/locales'

export default function EmailVerifyPage({ success }) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const [message, setMessage] = useState({})
  success
    ? setMessage({
        label: t.emailVerifyPage.message,
        type: 'success'
      })
    : setMessage({
        label: t.emailVerifyPage.errorMessage,
        type: 'danger'
      })

  return <LoginForm message={message} />
}

export async function getServerSideProps(ctx) {
  const handler = nc()
  handler.use(all)
  await handler.run(ctx.req, ctx.res)

  const { token } = ctx.query

  const deletedToken = await findAndDeleteTokenByIdAndType(
    ctx.req.db,
    token,
    'emailVerify'
  )

  if (!deletedToken) return { props: { success: false } }

  await updateUserById(ctx.req.db, deletedToken.creatorId, {
    emailVerified: true
  })

  return { props: { success: true } }
}
