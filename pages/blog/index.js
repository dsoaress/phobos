import useSWR from 'swr'

import Layout from '../../components/layout'
import ItemsList from '../../components/items-list'
import api from '../../utils/api'

export default function Blog(props) {
  const { data } = useSWR('/api/blog', api, { initialData: props })
  return (
    <Layout title="Blog">
      <div className="container">{data && <ItemsList data={data.data} />}</div>
    </Layout>
  )
}

export async function getStaticProps() {
  const { data } = await api(`${process.env.NEXT_PUBLIC_URL}/api/blog`)

  return { props: { data } }
}
