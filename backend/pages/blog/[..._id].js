import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import BlogPost from '@/components/BlogPost'
import locales from '@/locales'

export default function BlogPostPage({ post }) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const [body, setBody] = useState(post?.body)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const statusItems = [
    {
      value: 'draft',
      name: t.blogPostPage.draft
    },
    {
      value: 'public',
      name: t.blogPostPage.public
    }
  ]

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')

    const { date, status, title } = e.currentTarget
    const image = e.currentTarget.image.files[0] || post?.image

    if (!body || !date || !image || !title) {
      setMessage({
        label: t.blogPostPage.warningMessage,
        type: 'warning'
      })
      setTimeout(() => {
        setMessage('')
      }, 3000)
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('_id', post?._id)
    formData.append('body', body)
    formData.append('date', date.value)
    formData.append('image', image)
    formData.append('status', status.value)
    formData.append('title', title.value)

    const res = post
      ? await axios.patch('/api/blog', formData)
      : await axios.put('/api/blog', formData)

    if (res.status === 200) {
      setMessage({
        label: t.blogPostPage.message,
        type: 'success'
      })
      setTimeout(() => {
        router.push('/blog')
      }, 3000)
    } else {
      setMessage({
        label: t.blogPostPage.errorMessage,
        type: 'danger'
      })
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    await axios.delete('/api/blog', {
      params: { _id: post._id }
    })
    setMessage({
      label: t.blogPostPage.deleteMessage,
      type: 'success'
    })
    setTimeout(() => {
      router.push('/blog')
    }, 3000)
  }

  return (
    <BlogPost
      body={body}
      handleDelete={handleDelete}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
      post={post}
      setBody={setBody}
      statusItems={statusItems}
    />
  )
}

export async function getServerSideProps(ctx) {
  const _id = ctx.query._id
  const res = await axios.get(`${process.env.WEB_URL}/api/blog/${_id}`)
  const post = res.data

  return {
    props: post
  }
}
