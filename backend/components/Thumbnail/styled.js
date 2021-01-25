import NextImage from 'next/image'
import tw from 'twin.macro'

export const Thumbnail = tw.div`
  relative
  flex-shrink-0
  h-12
  w-12
`

export const Image = tw(NextImage)`rounded-full`
