import React from 'react'
import nc from 'next-connect'
import { all } from '@/middlewares'
import { updateUserById, findAndDeleteTokenByIdAndType } from '@/db'

import LoginWrapper from '@/components/login-wrapper'
import Alert from '@/components/alert'

export default function EmailVerifyPage({ success }) {
  return (
    <LoginWrapper>
      {success ? (
        <Alert
          label="Obrigado por verificar seu email, você pode fechar essa janela"
          className="success"
        />
      ) : (
        <Alert label="O link está expirado" className="danger" />
      )}
    </LoginWrapper>
  )
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
