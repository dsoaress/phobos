import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import Subheader from '@/components/Subheader'
import Container from '@/components/Container'
import ItemsList from '@/components/ItemsList'
import fetcher from '@/lib/fetch'
import locales from '@/locales'

export default function Sections(props) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const { data } = useSWR('/api/pages', fetcher, { initialData: props.data })
  return (
    <Layout>
      <Subheader title={t.sectionsPage} />
      <Container>{data && <ItemsList data={data.pages} />}</Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.WEB_URL}/api/sections`)

  return { props: { data } }
}
