import { useLoading, TailSpin } from '@agney/react-loading'

import Head from './head'

export default function SplashScreen() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <TailSpin width="50" />
  })

  return (
    <>
      <Head />
      <div className="flex justify-center items-center bg-indigo-800 h-screen w-screen">
        <section {...containerProps}>{indicatorEl}</section>
      </div>
    </>
  )
}
