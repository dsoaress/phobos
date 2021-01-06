import { useState } from 'react'
import axios from 'axios'

import { Input, Checkbox, Textarea } from '../../components/input'

export default function BlogPost(props) {
  const [{ title, date, published, image, body }, setValue] = useState(props)

  const onChange = event => {
    setValue(event.target.value)
  }

  return (
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
  )
}

export async function getServerSideProps(context) {
  const _id = context.query._id
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/blog/${_id}`
  )
  const post = response.data

  return {
    props: post
  }
}
