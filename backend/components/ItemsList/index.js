import Link from 'next/link'
import { useRouter } from 'next/router'

import Thumbnail from '@/components/Thumbnail'
import Badge from '@/components/Badge'
import Alert from '@/components/Alert'
import formatDate from '@/lib/format-date'
import locales from '@/locales'

import * as S from './styled'

export default function ItemsList({
  basePath,
  data,
  title,
  isSection = false
}) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  return (
    <S.ItemsList>
      {title && <S.Title>{title}</S.Title>}
      {data?.length > 0 ? (
        <S.Wrapper>
          {data.map(item => (
            <S.Item key={item._id}>
              {!isSection && (
                <Thumbnail
                  src={item.image || '/assets/profilePicture.jpeg'}
                  alt={item.title}
                />
              )}
              <S.ItemTitle>
                <Link href={basePath + item._id}>
                  <S.TitleLink>{item.title}</S.TitleLink>
                </Link>
                <S.Meta>
                  {item.date && formatDate(item.date)}
                  {item.role && item.role}{' '}
                  {item.status && <Badge status={item.status} />}
                </S.Meta>
              </S.ItemTitle>
              <Link href={basePath + item._id}>
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
