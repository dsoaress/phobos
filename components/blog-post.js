import { Input, Checkbox, Textarea } from './input'

export default function BlogPost({ onSubmit, onChange, message, loading }) {
  return (
    <form onSubmit={onSubmit} className="container space-y-4 mt-8">
      <Input
        type="text"
        id="title"
        label="Título"
        onChange={onChange}
        required
      />
      <Input type="date" id="date" label="Data" onChange={onChange} required />
      <Input
        type="text"
        id="image"
        label="Imagem"
        onChange={onChange}
        required
      />
      <Checkbox
        type="checkbox"
        id="status"
        label="Rascunho"
        value="draft"
        onChange={onChange}
      />
      <Textarea id="body" label="Corpo" onChange={onChange} required />
      <button type="submit">{loading ? 'Salvando...' : 'Salvar'}</button>
      {message && message}
    </form>
  )
}
