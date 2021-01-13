import { useRouter } from 'next/router'

import Meta from '@/components/Meta'
import { Input } from '@/components/Inputs'
import Button from '@/components/Button'
import Link from '@/components/Link'
import Alert from '@/components/Alert'

import locales from '@/locales'

import * as S from './styled'

export default function LoginForm({
  buttonLabel,
  email,
  hasForgatPassword,
  hasLogin,
  isLoading,
  message,
  name,
  onSubmit,
  password,
  title
}) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  return (
    <>
      <Meta />
      <S.LoginWrapper>
        <S.Wrapper>
          <div>
            <S.Image
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <S.Title>{title}</S.Title>
          </div>
          <S.Form onSubmit={onSubmit}>
            {name && (
              <Input
                id="name"
                type="name"
                label={t.loginForm.name}
                srOnly
                required
              />
            )}
            {email && (
              <Input
                id="email"
                type="email"
                label={t.loginForm.email}
                srOnly
                required
              />
            )}
            {password && (
              <Input
                id="password"
                type="password"
                label={t.loginForm.password}
                srOnly
                required
              />
            )}
            {!hasLogin && (
              <Button
                label={buttonLabel}
                isLoading={isLoading}
                type="submit"
                full
              />
            )}
            {hasForgatPassword && (
              <Link href="/forget-password">
                <Button label={t.loginForm.forgatPassword} secondary full />
              </Link>
            )}
            {hasLogin && (
              <Link href="/login">
                <Button label={buttonLabel} full />
              </Link>
            )}
            <Alert message={message} />
          </S.Form>
        </S.Wrapper>
      </S.LoginWrapper>
    </>
  )
}
