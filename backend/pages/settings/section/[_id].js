import axios from 'axios'

import Layout from '@/components/Layout'
import Container from '@/components/Container'

export default function User({ section }) {
  return (
    <Layout>
      <Container>
        <h1>{section.title}</h1>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const _id = ctx.query._id
  const res = await axios.get(`${process.env.WEB_URL}/api/sections/${_id}`)
  const section = res.data

  return {
    props: section
  }
}
