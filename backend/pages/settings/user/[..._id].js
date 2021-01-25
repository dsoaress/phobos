import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import User from '@/components/User'
import locales from '@/locales'

export default function UserPage({ user }) {
  const router = useRouter()
  const { locale } = router
  const t = locales[locale]

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  return <User loading={loading} message={message} user={user} />
}

export async function getServerSideProps(ctx) {
  const _id = ctx.query._id
  const res = await axios.get(`${process.env.WEB_URL}/api/users/${_id}`)
  const user = res.data

  return {
    props: user
  }
}
