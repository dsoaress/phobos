import { useRouter } from 'next/router'

import SplashScreen from '../components/splash-screen'

export default function Index() {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push('/blog')
  }
  return <SplashScreen />
}
