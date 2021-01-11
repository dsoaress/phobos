import tw from 'twin.macro'

import Spinner from '@/components/Spinner'

import * as S from './styled'

export default function SpinnerScreen() {
  return (
    <S.SpinnerScreen>
      <Spinner css={[tw`w-20`]} fill="#4f46e5" />
    </S.SpinnerScreen>
  )
}
