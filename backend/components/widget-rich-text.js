import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function WidgetRichText(props) {
  return <ReactQuill theme="snow" {...props} />
}
