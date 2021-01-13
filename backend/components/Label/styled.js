import tw, { styled } from 'twin.macro'

export const Label = styled.label(({ srOnly }) => [
  tw`
    text-xs
    text-gray-500
    font-normal
    leading-10
  `,
  srOnly && tw`sr-only`
])
