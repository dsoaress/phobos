import tw, { styled } from 'twin.macro'

export const Badge = styled.span(({ status }) => [
  tw`
    px-1.5
    inline-flex
    text-xs
    leading-5
    rounded-full
  `,
  status === 'public'
    ? tw`bg-green-100 text-green-800`
    : tw`bg-yellow-100 text-yellow-800`
])
