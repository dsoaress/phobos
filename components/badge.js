export default function Badge({ published }) {
  return (
    <span className={`badge ${published ? 'published' : 'draft'}`}>
      {published ? 'Publicado' : 'Rascunho'}
    </span>
  )
}
