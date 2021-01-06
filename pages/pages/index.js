import useSWR from 'swr'

import Layout from '../../components/layout'
import ItemsList from '../../components/items-list'
import api from '../../utils/api'

export default function Pages() {
  const { data } = useSWR('/api/pages', api)
  return (
    <Layout title="Páginas">
      <div className="container">{data && <ItemsList data={data.data} />}</div>
    </Layout>
  )
}
