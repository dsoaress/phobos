import * as S from './styled'

export default function Footer() {
  return (
    <S.Footer>
      <S.Wrapper>
        <p>{new Date().getFullYear()} &copy; Phobos CMS</p>
        <p>
          Desenvolvido por{' '}
          <S.Link href="https://marscollective.co">Mars Collective</S.Link>
        </p>
      </S.Wrapper>
    </S.Footer>
  )
}
