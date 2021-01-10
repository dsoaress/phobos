import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import Layout from '@/components/layout'
import WidgetImageUpload from '@/components/widget-image-upload'
import WidgetRichText from '@/components/widget-rich-text'

export default function BlogPost({ post }) {
  const imageRef = useRef()
  const dateRef = useRef()
  const statusRef = useRef()
  const titleRef = useRef()
  const [body, setBody] = useState(post?.body)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  if (post) {
    useEffect(() => {
      // dateRef.current.value = post.date
      // imageRef.current.value = user.image
      statusRef.current.value = post.status
      titleRef.current.value = post.title
    }, [post])
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('body', body)
    formData.append('date', dateRef.current.value)
    formData.append('image', event.target.image.files[0])
    formData.append('status', statusRef.current.value)
    formData.append('title', titleRef.current.value)

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
      <form onSubmit={handleSubmit} className="post">
        <label>
          Título
          <input type="text" id="title" ref={titleRef} required />
        </label>
        <label>
          Data
          <input type="date" id="date" ref={dateRef} required />
        </label>
        <WidgetImageUpload id="image" />
        <label>
          <input type="checkbox" id="status" ref={statusRef} /> Rascunho
        </label>
        <WidgetRichText value={body} onChange={setBody} />
        <button type="submit">{loading ? 'Salvando...' : 'Salvar'}</button>
        {message && message}
      </form>
    </Layout>
  )
}
