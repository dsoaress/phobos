import React from 'react'
import nc from 'next-connect'
import { all } from '@/middlewares'
import { updateUserById, findAndDeleteTokenByIdAndType } from '@/db'

import AuthenticationWrapper from '@/components/authentication-wrapper'

export default function EmailVerifyPage({ success }) {
  return (
    <AuthenticationWrapper>
      {success ? (
        <span className="block rounded-md bg-red-100 text-red-800 text-center p-4">
          Obrigado por verificar seu email, você pode fechar essa janela
        </span>
      ) : (
        <span className="block rounded-md bg-red-100 text-red-800 text-center p-4">
          O link está expirado
        </span>
      )}
    </AuthenticationWrapper>
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
