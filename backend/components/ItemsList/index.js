import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import Thumbnail from '@/components/Thumbnail'
import Badge from '@/components/Badge'
import Alert from '@/components/Alert'
import locales from '@/locales'

import * as S from './styled'

export default function ItemsList({ data, title }) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const message = {
    label: t.listComponent.message,
    type: 'warning'
  }
  return (
    <S.ItemsList>
      {title && <h2>{title}</h2>}
      {data.length > 0 ? (
        <S.Wrapper>
          {data.map(item => {
            const date = {
              en: format(parseISO(item.date), 'MMM d, yyyy'),
              pt: format(parseISO(item.date), "d 'de' MMM 'de' yyyy", {
                locale: pt
              })
            }

            return (
              <S.Item key={item._id}>
                {item.image && <Thumbnail src={item.image} alt={item.title} />}
                <S.Title>
                  <Link href={router.pathname + '/' + item._id}>
                    <S.TitleLink>{item.title}</S.TitleLink>
                  </Link>
                  {(item.date || item.role) && (
                    <S.Meta>
                      {date[locale] || item.role} <Badge status={item.status} />
                    </S.Meta>
                  )}
                </S.Title>
                <Link href={router.pathname + '/' + item._id}>
                  <S.EditLink>{t.listComponent.edit}</S.EditLink>
                </Link>
              </S.Item>
            )
          })}
        </S.Wrapper>
      ) : (
        <Alert message={message} />
      )}
    </S.ItemsList>
  )
}
