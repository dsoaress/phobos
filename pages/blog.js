import useSWR from 'swr'

import ItemsList from '../components/items-list'
import api from '../utils/api'

export default function Blog() {
  const { data } = useSWR('/api/blog', api)
  return (
    <div className="container">
      <h1>Blog</h1>
      {data && <ItemsList data={data.data} />}
    </div>
  )
}
