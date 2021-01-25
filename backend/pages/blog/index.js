import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

import Layout from '@/components/Layout'
import Subheader from '@/components/Subheader'
import Container from '@/components/Container'
import Button from '@/components/Button'
import Link from '@/components/Link'
import ItemsList from '@/components/ItemsList'
import fetcher from '@/lib/fetch'
import locales from '@/locales'

export default function Blog(props) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const { data } = useSWR('/api/blog', fetcher, { initialData: props.data })
  return (
    <Layout>
      <Subheader title={t.blogPage.title}>
        <Link href="/blog/new">
          <Button label={t.blogPage.buttonLabel} small />
        </Link>
      </Subheader>
      <Container>
        {data && (
          <ItemsList data={data.posts} title="Posts" basePath="/blog/" />
        )}
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.WEB_URL}/api/blog`)

  return { props: { data } }
}
