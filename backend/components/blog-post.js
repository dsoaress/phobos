import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import Layout from '@/components/layout'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function BlogPost({ post }) {
  const imageRef = useRef()
  const bodyRef = useRef()
  const dateRef = useRef()
  const statusRef = useRef()
  const titleRef = useRef()
  const [loading, setLoading] = useState(false)
  const [hasChange, setHasChange] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  if (post) {
    useEffect(() => {
      // bodyRef.current.value = post.body
      dateRef.current.value = post.date
      // imageRef.current.value = user.image
      statusRef.current.value = post.status
      titleRef.current.value = post.title
    }, [post])
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('body', 'Lorem ipsum')
    formData.append('date', dateRef.current.value)
    formData.append('image', imageRef.current.files[0])
    formData.append('status', statusRef.current.value)
    formData.append('title', titleRef.current.value)

    // const res = post
    //   ? await axios.patch('/api/blog', formData)
    //   : await axios.post('/api/blog', formData)

    // if (res.status === 200) {
    //   router.push('/blog')
    // } else {
    //   setMessage('Ocorreu um erro, tente novamente')
    // }
    setLoading(false)
  }

  return (
    <Layout postId={post?._id}>
      <form onSubmit={handleSubmit} className="container space-y-4 mt-8">
        <label>
          Título
          <input
            type="text"
            id="title"
            label="Título"
            ref={titleRef}
            required
          />
        </label>
        <label>
          Data
          <input type="date" id="date" label="Data" ref={dateRef} required />
        </label>
        <label>
          Imagem
          <input
            type="file"
            id="image"
            label="Imagem"
            accept="image/png, image/jpeg, image/jpg"
            ref={imageRef}
            required
          />
        </label>
        <label>
          <input type="checkbox" id="status" label="Rascunho" ref={statusRef} />{' '}
          Rascunho
        </label>
        <ReactQuill theme="snow" ref={bodyRef} />
        <button disabled={hasChange} type="submit">
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
        {message && message}
      </form>
    </Layout>
  )
}
