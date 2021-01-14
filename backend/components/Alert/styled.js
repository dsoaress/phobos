import tw, { styled } from 'twin.macro'

export const Alert = styled.div(({ full, message }) => [
  tw`h-14`,
  full &&
    message &&
    tw`
      absolute
      inset-0
      min-h-screen
      bg-black
      bg-opacity-60
      z-20
      flex
      justify-center
    `
])

export const Wrapper = styled.div(({ full }) => [full && tw`container pt-40`])

export const Content = styled.span(({ type }) => [
  tw`
    block
    relative
    rounded-md
    text-sm
    text-center
    p-4
    border
    mx-auto
  `,
  type === 'danger' && tw`border-red-200 bg-red-100 text-red-800`,
  type === 'success' && tw`border-green-200 bg-green-100 text-green-800`,
  type === 'warning' && tw`border-yellow-200 bg-yellow-100 text-yellow-800`
])
