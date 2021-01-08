import { useState } from 'react'

import Layout from '../../components/layout'
import { Input, Checkbox, Textarea } from '../../components/input'
import api from '../../utils/api'

export default function BlogPost(props) {
  const [{ title, date, published, image, body }, setValue] = useState(props)

  const onChange = event => {
    setValue(event.target.value)
  }

  return (
    <Layout>
      <div className="container">
        <form>
          <Input
            type="text"
            id="title"
            label="Título"
            value={title}
            onChange={onChange}
            required
          />
          <Input
            type="date"
            id="date"
            label="Data"
            value={date}
            onChange={onChange}
            required
          />
          <Input
            type="text"
            id="image"
            label="Imagem"
            value={image}
            onChange={onChange}
            required
          />
          <Checkbox
            type="checkbox"
            id="published"
            label="Rascunho"
            value={published}
          />
          <Textarea
            id="body"
            label="Corpo"
            value={body}
            onChange={onChange}
            required
          />
        </form>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const _id = context.query._id
  const response = await api(`${process.env.WEB_URI}/api/blog/${_id}`)
  const post = response.data

  return {
    props: post
  }
}
