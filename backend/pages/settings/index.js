import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

import Layout from '@/components/Layout'
import Subheader from '@/components/Subheader'
import Container from '@/components/Container'
import ItemsList from '@/components/ItemsList'
import Link from '@/components/Link'
import Button from '@/components/Button'
import { Input, Textarea } from '@/components/Inputs'
import Alert from '@/components/Alert'
import fetcher from '@/lib/fetch'
import locales from '@/locales'

import * as S from '@/components/SettingsPage'

export default function SettingsPage(props) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const { data: sections } = useSWR('/api/sections', fetcher, {
    initialData: props.sections
  })
  const { data: users } = useSWR('/api/users', fetcher, {
    initialData: props.users
  })
  const { data: seo } = useSWR('/api/seo', fetcher, { initialData: props.seo })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSEO = async e => {
    e.preventDefault()
    setMessage('')

    const { title, gtm, description } = e.currentTarget

    if (!title || !description) {
      setMessage({
        label: t.seoSection.warningMessage,
        type: 'warning'
      })
      setTimeout(() => {
        setMessage('')
      }, 3000)
      return
    }

    setLoading(true)
    const res = await axios.post('/api/seo', {
      title: title.value,
      gtm: gtm.value,
      description: description.value
    })

    if (res.status === 200) {
      setMessage({
        label: t.seoSection.message,
        type: 'success'
      })
    } else {
      setMessage({
        label: t.seoSection.errorMessage,
        type: 'danger'
      })
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
    setLoading(false)
  }

  return (
    <Layout>
      <Subheader title={t.settingsPage} />
      <Container>
        <S.Settings>
          <S.Wrapper>
            <ItemsList
              title={t.sectionsPage}
              data={sections.sections}
              basePath="/settings/section/"
              isSection
            />
          </S.Wrapper>
          <S.Wrapper>
            <ItemsList
              title={t.usersSection.title}
              data={users.users}
              basePath="/settings/user/"
            />
            <div>
              <Link href="/settings/user/new">
                <Button label={t.usersSection.buttonLabel} full />
              </Link>
            </div>

            <form onSubmit={handleSEO}>
              <S.Wrapper>
                <S.Title>{t.seoSection.title}</S.Title>
                <Input
                  type="text"
                  id="title"
                  label="Site title"
                  defaultValue={seo.seo?.title}
                />
                <Input
                  type="text"
                  id="gtm"
                  label="Google Tag Manager"
                  defaultValue={seo.seo?.gtm}
                />
                <Textarea
                  id="description"
                  label="Site Description"
                  defaultValue={seo.seo?.description}
                />
                <Button
                  tupe="submit"
                  label="Salvar"
                  isLoading={loading}
                  disabled={loading ? true : false}
                  full
                />
                <Alert message={message} />
              </S.Wrapper>
            </form>
          </S.Wrapper>
        </S.Settings>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data: sections } = await axios.get(
    `${process.env.WEB_URL}/api/sections`
  )
  const { data: users } = await axios.get(`${process.env.WEB_URL}/api/users`)
  const { data: seo } = await axios.get(`${process.env.WEB_URL}/api/seo`)

  return { props: { sections, seo, users } }
}
