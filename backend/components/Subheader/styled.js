import tw from 'twin.macro'

export const Header = tw.header`
  sticky
  top-0
  bg-white
  shadow
  mb-10
  z-10
`

export const HeaderWrapper = tw.div`
  container
  flex
  items-center
  justify-center
  space-x-4
  `

export const Title = tw.h1`
  flex-grow
  text-xl
  font-bold
  leading-tight
  py-6
`
