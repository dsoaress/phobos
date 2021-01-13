import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles } from 'twin.macro'

export const TwinMacroGlobal = () => <GlobalStyles />

export const StyledComponentsGlobal = createGlobalStyle`
  html {
    ${tw`
      bg-gray-50
      text-gray-900
      transition-colors
      duration-500
    `}
  }
  body {
    ${tw`relative min-h-screen`}
  }
  a {
    ${tw`transition duration-500`}
  }
  .active {
    ${tw`bg-gray-900 text-white`}
  }
  .quill {
    ${tw`rounded-md`}
  }
  .quill .ql-toolbar.ql-snow {
    ${tw`
      rounded-t-md
      bg-white
      border-gray-300
      font-sans
      py-3
    `}
  }
  .quill .ql-container.ql-snow {
    ${tw`
      rounded-b-md
      font-sans
      bg-white
      border-gray-300
    `}
  }
  .quill .ql-editor {
    ${tw`text-base`};
    min-height: 27.95rem;
  }
  .quill .ql-editor p {
    ${tw`mb-4 leading-6`}
  }
`
