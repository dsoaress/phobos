import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content="Description" />
      <meta name="keywords" content="Keywords" />
      <title>Phobos CMS</title>

      <link rel="manifest" href="/manifest.webmanifest" />
      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
      <meta name="theme-color" content="#4f46e5" />
    </Head>
  )
}
