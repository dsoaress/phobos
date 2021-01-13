import { useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import Subheader from '@/components/Subheader'
import Button from '@/components/Button'
import { Input, Select } from '@/components/Inputs'
import WidgetImageUpload from '@/components/WidgetImageUpload'
import WidgetRichText from '@/components/WidgetRichText'
import Alert from '@/components/Alert'
import locales from '@/locales'

import * as S from './styled'

export default function BlogPost({
  body,
  handleDelete,
  loading,
  message,
  onSubmit,
  post,
  setBody,
  statusItems
}) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const [title, setTitle] = useState(post?.title)

  return (
    <Layout>
      <Subheader title={title || t.blogPostPage.newPost}>
        {post && <Button label="Excluir" onClick={handleDelete} danger small />}
        <Button label={t.blogPostPage.previewButton} small secondary />
        <Button
          type="submit"
          label={t.blogPostPage.saveButton}
          small
          isLoading={loading}
          form="post"
        />
      </Subheader>
      <S.Form onSubmit={onSubmit} id="post">
        <S.FormGroup>
          <Input
            type="text"
            id="title"
            label={t.blogPostPage.title}
            defaultValue={post?.title}
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <Input
            type="date"
            id="date"
            label={t.blogPostPage.date}
            defaultValue={post?.date}
          />
          <Select
            id="status"
            label={t.blogPostPage.status}
            defaultValue={post?.status}
            items={statusItems}
          />
          <WidgetImageUpload id="image" defaultValue={post?.image} />
        </S.FormGroup>
        <WidgetRichText value={body} onChange={setBody} />
      </S.Form>
      <Alert message={message} full />
    </Layout>
  )
}
