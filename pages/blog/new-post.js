import axios from 'axios'

import Layout from '../../components/layout'
import BlogPost from '../../components/blog-post'
import useForm from '../../hooks/use-form'

export default function NewPost() {
  const [{ values, message, loading }, handleChange, handleSubmit] = useForm()

  const savePost = async () => {
    await axios.post(`${process.env.WEB_URI}/api/blog`, values)
  }

  return (
    <Layout>
      <BlogPost
        onSubmit={handleSubmit(savePost)}
        onChange={handleChange}
        message={message}
        loading={loading}
      />
    </Layout>
  )
}
