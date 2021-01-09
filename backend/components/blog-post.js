import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import Layout from '@/components/layout'
import { Input, Checkbox } from '@/components/input'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function BlogPost({ post }) {
  const [body, setBody] = useState(post?.body)
  const [date, setDate] = useState(post?.date)
  const [image, setImage] = useState(post?.image)
  const [status, setStatus] = useState(post?.status)
  const [title, setTitle] = useState(post?.title)
  const [loading, setLoading] = useState(false)
  const [hasChange, setHasChange] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const content = {
      _id: post?._id,
      body,
      date,
      image,
      status,
      title
    }

    const res = post
      ? await axios.patch('/api/blog', content)
      : await axios.post('/api/blog', content)

    if (res.status === 200) {
      router.push('/blog')
    } else {
      setMessage('Ocorreu um erro, tente novamente')
    }
    setLoading(false)
  }

  return (
    <Layout postId={post?._id}>
      <form onSubmit={handleSubmit} className="container space-y-4 mt-8">
        <Input
          type="text"
          id="title"
          label="Título"
          defaultValue={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <Input
          type="date"
          id="date"
          label="Data"
          defaultValue={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <Input
          type="text"
          id="image"
          label="Imagem"
          defaultValue={image}
          onChange={e => setImage(e.target.value)}
          required
        />
        <Checkbox
          type="checkbox"
          id="status"
          label="Rascunho"
          defaultValue={status}
          onChange={e => setStatus(e.target.value)}
        />
        <ReactQuill theme="snow" value={body} onChange={setBody} />
        <button disabled={hasChange} type="submit">
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
        {message && message}
      </form>
    </Layout>
  )
}
