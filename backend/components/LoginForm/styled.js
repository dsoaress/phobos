import tw from 'twin.macro'

export const LoginWrapper = tw.div`
  min-h-screen
  flex
  items-center
  justify-center
  py-12
  px-4
  sm:px-6
  lg:px-8
  text-sm
  text-center
`

export const Wrapper = tw.div`
  max-w-md
  w-full
  -mt-20
  space-y-8
`

export const Image = tw.img`
  mx-auto
  h-12
  w-auto
`

export const Title = tw.h2`mt-6`

export const Form = tw.form`grid gap-6`
