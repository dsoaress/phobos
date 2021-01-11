import tw from 'twin.macro'

import * as S from './styled'

export default function MenuToggle(props) {
  return (
    <S.MenuToggle {...props}>
      <span css={[tw`sr-only`]}>Abrir menu principal</span>
      <svg
        css={[tw`block h-6 w-6`]}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </S.MenuToggle>
  )
}
