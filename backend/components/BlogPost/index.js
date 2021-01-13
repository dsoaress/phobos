import { useState } from 'react'

import Layout from '@/components/Layout'
import Subheader from '@/components/Subheader'
import Button from '@/components/Button'
import { Input, Select } from '@/components/Inputs'
import WidgetImageUpload from '@/components/WidgetImageUpload'
import WidgetRichText from '@/components/WidgetRichText'
import Alert from '@/components/Alert'

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
  const [title, setTitle] = useState(post?.title)

  return (
    <Layout>
      <Subheader title={title || 'Nova publicação'}>
        {post && <Button label="Excluir" onClick={handleDelete} danger small />}
        <Button type="submit" label="Preview" small secondary />
        <Button
          type="submit"
          label="Salvar"
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
            label="Título da publicação"
            defaultValue={post?.title}
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <Input
            type="date"
            id="date"
            label="Data da publicação"
            defaultValue={post?.date}
          />
          <Select
            id="status"
            label="Status da publicação"
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
