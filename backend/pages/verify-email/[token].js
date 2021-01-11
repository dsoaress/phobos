import { useState } from 'react'
import nc from 'next-connect'
import { all } from '@/middlewares'
import { updateUserById, findAndDeleteTokenByIdAndType } from '@/db'

import LoginForm from '@/components/LoginForm'

export default function EmailVerifyPage({ success }) {
  const [message, setMessage] = useState({})
  success
    ? setMessage({
        label: 'Obrigado por verificar seu email, você pode fechar essa janela',
        type: 'success',
        show: true
      })
    : setMessage({
        label: 'O link está expirado',
        type: 'danger',
        show: true
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
