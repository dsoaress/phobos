import {
  StyledComponentsGlobal,
  TwinMacroGlobal
} from '@/components/GlobalStyles'
import 'react-quill/dist/quill.snow.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <TwinMacroGlobal />
      <StyledComponentsGlobal />
      <Component {...pageProps} />
    </>
  )
}
