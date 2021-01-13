import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import Label from '@/components/Label'
import locales from '@/locales'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function WidgetRichText(props) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  return (
    <div>
      <Label label={t.blogPostPage.body} />
      <ReactQuill theme="snow" {...props} />
    </div>
  )
}
