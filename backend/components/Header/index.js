import { useState } from 'react'
import { useRouter } from 'next/router'
import tw from 'twin.macro'

import Container from '@/components/Container'
import ActiveLink from '@/components/ActiveLink'
import Button from '@/components/Button'
import { useCurrentUser } from '@/hooks'
import locales from '@/locales'

import * as S from './styled'

export default function Header() {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const [menuOpen, setMenuOpen] = useState(false)
  const [, { mutate }] = useCurrentUser()

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE'
    })
    mutate(null)
    router.push('/login')
  }

  return (
    <S.Nav>
      <Container>
        <S.Wrapper>
          <S.Logo>
            <S.MenuToggle onClick={() => setMenuOpen(!menuOpen)}>
              <span css={[tw`sr-only`]}>{t.header.menuToggle}</span>
              <svg
                css={[tw`block h-6 w-6`]}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </S.MenuToggle>
            <img
              css={[tw`h-8 w-8`]}
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </S.Logo>
          <S.Menu menuOpen={menuOpen}>
            <ActiveLink activeClassName="active" href="/blog">
              <S.NavLink onClick={() => setMenuOpen(!menuOpen)}>
                {t.blogPage.title}
              </S.NavLink>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/settings">
              <S.NavLink onClick={() => setMenuOpen(!menuOpen)}>
                {t.settingsPage}
              </S.NavLink>
            </ActiveLink>
            <S.Logout>
              <Button
                label={t.header.logout}
                onClick={handleLogout}
                full
                secondary
                small
              />
            </S.Logout>
          </S.Menu>
        </S.Wrapper>
      </Container>
    </S.Nav>
  )
}
