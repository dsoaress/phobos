import * as S from './styled'

export default function Button({ label, isLoading, ...props }) {
  return (
    <S.Button {...props}>
      {isLoading && <S.SpinnerStyled />}
      {label}
    </S.Button>
  )
}
