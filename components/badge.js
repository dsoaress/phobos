export default function Badge({ status }) {
  return (
    <span className={`badge ${status === 'draft' ? 'draft' : 'published'}`}>
      {status === 'draft' ? 'Rascunho' : 'Publicado'}
    </span>
  )
}
