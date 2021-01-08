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

export async function getServerSideProps() {
  const { data } = await api(`${process.env.WEB_URI}/api/pages`)

  return { props: { data } }
}
