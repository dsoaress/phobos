import * as S from './styled'

export default function Header({ children, title }) {
  return (
    <S.Header>
      <S.HeaderWrapper>
        <S.Title>{title}</S.Title>
        {children}
      </S.HeaderWrapper>
    </S.Header>
  )
}
