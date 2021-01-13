import tw, { styled } from 'twin.macro'

import Spinner from '@/components/Spinner'

export const Button = styled.button(({ ...props }) => [
  tw`
    relative
    py-4
    px-8
    text-sm
    rounded-md
    font-medium
    text-white
    flex-shrink-0
    border
    border-indigo-600
    bg-indigo-600
    hover:bg-indigo-700
    focus:outline-none
    transition-colors
    duration-500
  `,
  props.secondary &&
    tw`
      text-indigo-900
      bg-indigo-100
      border-indigo-200
      hover:bg-indigo-200
      hover:border-indigo-300
    `,
  props.small && tw`px-3 py-2`,
  props.danger && tw`border-red-400 bg-red-600 hover:bg-red-700`,
  props.full && tw`relative w-full`,
  props.disabled &&
    tw`
        bg-gray-200
        border-gray-100
        hover:bg-gray-200
        text-gray-600
        cursor-not-allowed
      `
])

export const SpinnerStyled = tw(Spinner)`
  absolute
  left-4
  top-4
  fill-current
  w-5
`
