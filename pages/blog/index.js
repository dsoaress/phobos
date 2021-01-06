import useSWR from 'swr'

import Layout from '../../components/layout'
import ItemsList from '../../components/items-list'
import api from '../../utils/api'

export default function Blog() {
  const { data } = useSWR('/api/blog', api)
  return (
    <Layout title="Blog">
      <div className="container">{data && <ItemsList data={data.data} />}</div>
    </Layout>
  )
}
