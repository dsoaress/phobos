import useSWR from 'swr'

import fetcher from '@/lib/fetch'

export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/auth', fetcher)
  const user = data?.user
  return [user, { mutate }]
}
