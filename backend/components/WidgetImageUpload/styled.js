import tw from 'twin.macro'

export const Wrapper = tw.div`
  w-full
  bg-white
  border
  border-gray-300
  rounded-md
  p-4
  text-xs
  text-center
  text-gray-500
  font-normal
  leading-8
`

export const Main = tw.div`
  flex
  justify-center
  items-center
  border-2
  border-dashed
  rounded-md
  h-full
  p-3
  cursor-pointer
`

export const TextGroup = tw.div`py-2`

export const Title = tw.p`text-base mb-2`

export const Desc = tw.p`leading-5`

export const ThumbWrapper = tw.div`

`

export const Thumb = tw.div`
  h-48
  overflow-hidden
  rounded-md
`
