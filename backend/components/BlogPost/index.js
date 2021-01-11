import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import { Input, Checkbox } from '@/components/Inputs'
import WidgetImageUpload from '@/components/WidgetImageUpload'
import WidgetRichText from '@/components/WidgetRichText'
import Button from '@/components/Button'

import * as S from './styled'

export default function BlogPost({ post }) {
  const [published, setPublished] = useState(post?.published || false)
  const [body, setBody] = useState(post?.body)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    if (post) {
      formData.append('_id', post._id)
    }
    formData.append('body', body)
    formData.append('date', e.currentTarget.date.value)
    formData.append('image', e.currentTarget.image.files[0])
    formData.append('published', published)
    formData.append('title', e.currentTarget.title.value)

    const res = post
      ? await axios.patch('/api/blog', formData)
      : await axios.post('/api/blog', formData)

    if (res.status === 200) {
      router.push('/blog')
    } else {
      setMessage('Ocorreu um erro, tente novamente')
    }
    setLoading(false)
  }

  return (
    <Layout postId={post?._id}>
      <S.Form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="title"
          label="Título da publicação"
          defaultValue={post?.title}
          required
        />
        <Input
          type="date"
          id="date"
          label="Data da publicação (você pode usar datas no passado ou no futuro)"
          defaultValue={post?.date}
          required
        />
        <WidgetImageUpload id="image" />
        <Checkbox
          type="checkbox"
          id="status"
          label="Publicar ao salvar?"
          checked={published}
          onChange={() => setPublished(!published)}
        />
        <WidgetRichText value={body} onChange={setBody} />
        <Button type="submit" label="Salvar" isLoading={loading} />
        {message && message}
      </S.Form>
    </Layout>
  )
}
