import { useRouter } from 'next/router'

import locales from '@/locales'

import * as S from './styled'

export default function Badge({ status }) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  return (
    <S.Badge status={status}>
      {status === 'public' ? t.blogPostPage.public : t.blogPostPage.draft}
    </S.Badge>
  )
}
