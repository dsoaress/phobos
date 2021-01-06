import { useState } from 'react'

export default function useForm() {
  const [values, setValues] = useState({})
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = event => {
    const auxValues = { ...values }
    auxValues[event.target.name] = event.target.value
    setValues(auxValues)
  }

  const handleSubmit = callback => event => {
    event.preventDefault()
    setLoading(true)
    callback()
    setMessage('Post salvo')
    setLoading(false)
  }

  return [{ values, message, loading }, handleChange, handleSubmit]
}
