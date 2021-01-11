import tw, { css, styled } from 'twin.macro'

export const Label = styled.label(({ srOnly }) => [
  tw`
    text-xs
    text-gray-500
    font-normal
    leading-10
  `,
  srOnly && tw`sr-only`
])

export const Input = styled.input(() => [InputBase], tw`block w-full`)

export const Checkbox = styled.input(() => [InputBase], tw`mr-2`)

export const Textarea = styled.textarea(() => [
  InputBase,
  tw`block w-full resize-none h-96`
])

const InputBase = css`
  ${tw`
    p-4
    rounded-md
    border
    border-gray-300
    bg-white
    placeholder-gray-500
    text-gray-900
    focus:outline-none
    focus:border-indigo-500
    sm:text-sm
  `}
`
