import useSWR from 'swr'
import axios from 'axios'
import tw from 'twin.macro'

import Layout from '@/components/Layout'
import ItemsList from '@/components/ItemsList'
import fetcher from '@/lib/fetch'

export default function Blog(props) {
  const { data } = useSWR(
    '/api/blog',
    fetcher,
    { refreshInterval: 1000 },
    { initialData: props.data }
  )
  return (
    <Layout title="Blog">
      <div css={[tw`container`]}>{data && <ItemsList data={data.posts} />}</div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.WEB_URL}/api/blog`)

  return { props: { data } }
}
