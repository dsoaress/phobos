import { useRouter } from 'next/router'

import Container from '@/components/Container'
import locales from '@/locales'

import * as S from './styled'

export default function Footer() {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  return (
    <S.Footer>
      <Container>
        <S.Wrapper>
          <p>{new Date().getFullYear()} &copy; Phobos CMS</p>
          <p>
            {t.footer}{' '}
            <S.Link href="https://marscollective.co">Mars Collective</S.Link>
          </p>
        </S.Wrapper>
      </Container>
    </S.Footer>
  )
}
