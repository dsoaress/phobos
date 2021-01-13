import tw from 'twin.macro'

export const Nav = tw.nav`bg-gray-800`

export const Wrapper = tw.div`
  container
  md:flex
  items-center
  justify-between
  py-4
`

export const Logo = tw.div`
  flex
  items-center
  space-x-4
  md:space-x-0
`

export const MenuToggle = tw.button`
  md:hidden
  bg-gray-800
  p-2
  rounded-md
  text-gray-400
  hover:text-white
  hover:bg-gray-700
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-offset-gray-800
  focus:ring-white
`

export const NavLink = tw.a`
  text-gray-300
  hover:bg-gray-700
  hover:text-white
  block
  px-3
  py-2
  rounded-md
  text-sm
  font-medium
  cursor-pointer
`

export const Logout = tw.div`
  py-2
  md:p-0
  border-t
  border-gray-700
  md:pt-0
  md:border-none
`
