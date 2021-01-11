import tw, { styled } from 'twin.macro'

export const Alert = tw.div`
  h-14
`

export const Wrapper = styled.span(({ type }) => [
  tw`
    block
    rounded-md
    text-center
    p-4
    border
  `,
  type === 'danger' && tw`border-red-200 bg-red-100 text-red-800`,
  type === 'success' && tw`border-green-200 bg-green-100 text-green-800`,
  type === 'warning' && tw`border-yellow-200 bg-yellow-100 text-yellow-800`
])
