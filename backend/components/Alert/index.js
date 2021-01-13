import * as S from './styled'

export default function Alert({ full, message }) {
  return (
    <S.Alert full={full} message={message}>
      <S.Wrapper full={full}>
        {message?.label && (
          <S.Content type={message.type}>{message.label}</S.Content>
        )}
      </S.Wrapper>
    </S.Alert>
  )
}
