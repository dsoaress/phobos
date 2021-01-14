import Container from '@/components/Container'

import * as S from './styled'

export default function Header({ children, title }) {
  return (
    <S.Header>
      <Container>
        <S.HeaderWrapper>
          <S.Title>{title}</S.Title>
          {children}
        </S.HeaderWrapper>
      </Container>
    </S.Header>
  )
}
