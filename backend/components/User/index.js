import { useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import Subheader from '@/components/Subheader'
import Container from '@/components/Container'
import Button from '@/components/Button'
import { Input, Select } from '@/components/Inputs'
import WidgetImageUpload from '@/components/WidgetImageUpload'
import Alert from '@/components/Alert'
import locales from '@/locales'

import * as S from './styled'

export default function User({
  handleDelete,
  loading,
  message,
  onSubmit,
  user
}) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const [title, setTitle] = useState(user?.title)

  const role = [
    {
      value: 'admin',
      name: t.generic.admin
    },
    {
      value: 'editor',
      name: t.generic.editor
    }
  ]

  return (
    <Layout>
      <Subheader title={title || t.usersSection.signupSection.title}>
        {user && (
          <Button
            label={t.usersSection.signupSection.deleteButton}
            onClick={handleDelete}
            danger
            small
          />
        )}
        <Button
          type="submit"
          label={loading ? t.generic.saveButtonLoading : t.generic.saveButton}
          disabled={loading ? true : false}
          small
          form="user"
        />
      </Subheader>
      <Container>
        <S.Form onSubmit={onSubmit} id="user">
          <S.FormGroup>
            <Input
              type="text"
              id="title"
              label={t.generic.name}
              defaultValue={user?.title}
              onChange={e => setTitle(e.currentTarget.value)}
            />
            <Input
              type="email"
              id="email"
              label={t.generic.email}
              defaultValue={user?.email}
            />
            <Select
              id="role"
              label={t.usersSection.signupSection.role}
              defaultValue={user?.role}
              items={role}
            />
          </S.FormGroup>
          <S.FormGroup>
            <Input type="password" id="password" label={t.generic.password} />
            <WidgetImageUpload id="image" defaultValue={user?.image} />
          </S.FormGroup>
        </S.Form>
      </Container>
      <Alert message={message} full />
    </Layout>
  )
}
