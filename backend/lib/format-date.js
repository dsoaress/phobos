import { useRouter } from 'next/router'
import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

export default function formatDate(rawDate) {
  const router = useRouter()
  const { locale } = router

  const date = {
    en: format(parseISO(rawDate), 'MMM d, yyyy'),
    pt: format(parseISO(rawDate), "d 'de' MMM 'de' yyyy", {
      locale: pt
    })
  }

  return date[locale]
}
