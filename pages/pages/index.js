import useSWR from 'swr'

import Layout from '../../components/layout'
import ItemsList from '../../components/items-list'
import api from '../../utils/api'

export default function Pages(props) {
  const { data } = useSWR('/api/pages', api, { initialData: props })
  return (
    <Layout title="Páginas">
      <div className="container">{data && <ItemsList data={data.data} />}</div>
    </Layout>
  )
}

export async function getStaticProps() {
  const { data } = await api(`${process.env.NEXT_PUBLIC_URL}/api/pages`)

  return { props: { data } }
}
