import Link from 'next/link'
import { useRouter } from 'next/router'

import Thumbnail from '@/components/Thumbnail'
import Badge from '@/components/Badge'
import Alert from '@/components/Alert'
import formatDate from '@/lib/format-date'
import locales from '@/locales'

import * as S from './styled'

export default function ItemsList({ data, title }) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

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
                    {formatDate(item.date) || item.role}{' '}
                    <Badge status={item.status} />
                  </S.Meta>
                )}
              </S.Title>
              <Link href={router.pathname + '/' + item._id}>
                <S.EditLink>{t.listComponent.edit}</S.EditLink>
              </Link>
            </S.Item>
          ))}
        </S.Wrapper>
      ) : (
        <Alert message={{ label: t.listComponent.message, type: 'warning' }} />
      )}
    </S.ItemsList>
  )
}
