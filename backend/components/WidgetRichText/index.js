import dynamic from 'next/dynamic'

import Label from '@/components/Label'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function WidgetRichText(props) {
  return (
    <div>
      <Label label="Corpo da publicação" />
      <ReactQuill theme="snow" {...props} />
    </div>
  )
}
