import useSWR from 'swr'
import axios from 'axios'

import Layout from '../../components/layout'
import ItemsList from '../../components/items-list'
import fetcher from '@/lib/fetch'

export default function Pages(props) {
  const { data } = useSWR('/api/pages', fetcher, { initialData: props.data })
  return (
    <Layout title="Páginas">
      <div className="container">{data && <ItemsList data={data.pages} />}</div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.WEB_URL}/api/pages`)

  return { props: { data } }
}
