import * as S from './styled'

export default function Label({ label, id, srOnly }) {
  return (
    <S.Label htmlFor={id} srOnly={srOnly}>
      {label}
    </S.Label>
  )
}
