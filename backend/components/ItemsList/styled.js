import tw from 'twin.macro'

export const ItemsList = tw.div`space-y-4`

export const Title = tw.h2`text-lg font-bold`

export const Wrapper = tw.div`
  rounded-md
  border
  border-gray-300
  bg-white
  divide-y
  divide-gray-300
`

export const Item = tw.div`
  flex
  items-center
  px-6
  h-20
  space-x-4
  text-sm
  font-medium
`

export const ItemTitle = tw.div`flex-grow`

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
