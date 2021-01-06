import axios from 'axios'

import useForm from '../../hooks/use-form'
import BlogPost from '../../components/blog-post'

export default function NewPost() {
  const [{ values, message, loading }, handleChange, handleSubmit] = useForm()

  const savePost = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/blog`, values)
  }

  return (
    <BlogPost
      onSubmit={handleSubmit(savePost)}
      onChange={handleChange}
      message={message}
      loading={loading}
    />
  )
}
