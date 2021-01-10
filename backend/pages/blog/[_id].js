import axios from 'axios'

import BlogPost from '@/components/blog-post'

export default function BlogPostPage(props) {
  return <BlogPost {...props} />
}

export async function getServerSideProps(ctx) {
  const _id = ctx.query._id
  const res = await axios.get(`${process.env.WEB_URL}/api/blog/${_id}`)
  const post = res.data

  return {
    props: post
  }
}
