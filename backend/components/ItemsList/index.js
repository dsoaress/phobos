import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import Thumbnail from '@/components/Thumbnail'
import Badge from '@/components/Badge'
import Alert from '@/components/Alert'

import * as S from './styled'

export default function ItemsList({ data, title }) {
  const router = useRouter()
  const message = {
    label: 'Não existe conteúdo para ser exibido aqui',
    type: 'warning',
    show: true
  }
  return (
    <S.ItemsList>
      {title && <h2>{title}</h2>}
      {data.length > 0 ? (
        <S.Wrapper>
          {data.map(item => (
            <S.Item key={item._id}>
              {item.image && <Thumbnail src={item.image} alt={item.title} />}
              <S.Title>
                <Link href={router.pathname + '/' + item._id}>
                  <S.TitleLink>{item.title}</S.TitleLink>
                </Link>
                {(item.date || item.role) && (
                  <S.Meta>
                    {format(parseISO(item.date), "d 'de' MMM 'de' yyyy", {
                      locale: pt
                    }) || item.role}{' '}
                    <Badge published={item.published} />
                  </S.Meta>
                )}
              </S.Title>
              <Link href={router.pathname + '/' + item._id}>
                <S.EditLink>Editar</S.EditLink>
              </Link>
            </S.Item>
          ))}
        </S.Wrapper>
      ) : (
        <Alert message={message} />
      )}
    </S.ItemsList>
  )
}
