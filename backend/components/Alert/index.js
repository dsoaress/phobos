import * as S from './styled'

export default function Alert({ message }) {
  return (
    <S.Alert>
      {message?.show && (
        <S.Wrapper type={message?.type}>{message?.label}</S.Wrapper>
      )}
    </S.Alert>
  )
}
