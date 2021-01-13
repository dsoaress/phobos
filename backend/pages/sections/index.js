import useSWR from 'swr'
import axios from 'axios'
import tw from 'twin.macro'

import Layout from '@/components/Layout'
import Subheader from '@/components/Subheader'
import ItemsList from '@/components/ItemsList'
import fetcher from '@/lib/fetch'

export default function Sections(props) {
  const { data } = useSWR('/api/pages', fetcher, { initialData: props.data })
  return (
    <Layout>
      <Subheader title="Páginas" />
      <div css={[tw`container`]}>{data && <ItemsList data={data.pages} />}</div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.WEB_URL}/api/sections`)

  return { props: { data } }
}
