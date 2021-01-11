import tw from 'twin.macro'

export const ItemsList = tw.div`space-x-4`

export const Wrapper = tw.div`
  rounded-md
  shadow
  border-b
  border-gray-200
  bg-white
  divide-y
  divide-gray-200
`

export const Item = tw.div`
  flex
  items-center
  px-6
  py-4
  space-x-4
  text-sm
  font-medium
`

export const Title = tw.div`flex-grow`

export const TitleLink = tw.a`text-gray-800 cursor-pointer`

export const Meta = tw.span`
  block
  text-xs
  font-normal
  text-gray-500
`

export const EditLink = tw.a`
  text-indigo-600
  hover:text-indigo-900
  cursor-pointer
`
