import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import tw from 'twin.macro'

import Layout from '@/components/Layout'
import Subheader from '@/components/Subheader'
import Button from '@/components/Button'
import Link from '@/components/Link'
import ItemsList from '@/components/ItemsList'
import fetcher from '@/lib/fetch'
import locales from '@/locales'

export default function Blog(props) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const { data } = useSWR(
    '/api/blog',
    fetcher,
    { refreshInterval: 1000 },
    { initialData: props.data }
  )
  return (
    <Layout>
      <Subheader title={t.blogPage.title}>
        <Link href="/blog/new">
          <Button label={t.blogPage.buttonLabel} small />
        </Link>
      </Subheader>
      <div css={[tw`container`]}>{data && <ItemsList data={data.posts} />}</div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.WEB_URL}/api/blog`)

  return { props: { data } }
}
