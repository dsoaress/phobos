import * as S from './styled'

export default function Badge({ published }) {
  return (
    <S.Badge published={published}>
      {published ? 'Publicado' : 'Rascunho'}
    </S.Badge>
  )
}
