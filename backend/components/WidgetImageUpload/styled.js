import tw from 'twin.macro'

export const Wrapper = tw.div`
  w-full
  bg-white
  border
  border-gray-300
  focus:outline-none
  focus:ring-indigo-500
  focus:border-indigo-500
  focus:z-10
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
  h-full p-4
  cursor-pointer
`

export const TextGroup = tw.div`py-4`

export const Title = tw.p`text-base mb-4`

export const Thumb = tw.div`
  h-60
  w-96
  overflow-hidden
  rounded-md
`
