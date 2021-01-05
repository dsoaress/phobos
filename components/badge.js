export default function Badge({ status }) {
  return (
    <span
      className={`px-1.5 inline-flex text-xs leading-5 rounded-full ${
        status === 'published'
          ? `bg-green-100 text-green-800`
          : `bg-yellow-100 text-yellow-800`
      }`}
    >
      {status === 'published' ? 'Publicado' : 'Rascunho'}
    </span>
  )
}
