import * as S from './styled'

export default function Badge({ status }) {
  return (
    <S.Badge status={status}>
      {status === 'public' ? 'Público' : 'Rascunho'}
    </S.Badge>
  )
}
