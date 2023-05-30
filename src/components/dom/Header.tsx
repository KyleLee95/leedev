'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'Blog', href: '/blog' },
]

interface NavLinkProps {
  navItem: NavItem
}
interface NavItem {
  name: string
  href: string
}

const NavLink = (props: NavLinkProps) => {
  const pathName = usePathname()
  const { name, href } = props.navItem
  return (
    <Link href={href} className={pathName === href ? 'relative py-1 underline' : 'relative py-1'}>
      {name}
    </Link>
  )
}
export const Header = () => {
  return (
    //the header element's primary function is to be fixed and have a z-index of 10
    //so that the child div can have the CSS effects without overlapping the scrollbar
    <header className='fixed flex z-10 w-full'>
      <div className='flex w-full h-20 justify-center items-center mx-6 z-10 bg-neutral-800/50 backdrop-blur-sm'>
        <p className='text-lg'>
          <Link className='text-2xl text-stone-400 hover:text-white' href='/'>
            Kyle Lee
          </Link>
        </p>

        <nav className='ml-auto flex items-center gap-2 sm:gap-6'>
          {navItems.map((navItem) => {
            return <NavLink key={navItem.name} navItem={navItem} />
          })}
        </nav>
      </div>
    </header>
  )
}

// <header className='overflow-auto top-0 left-0 px-10 z-10 fixed flex h-20 w-full items-center backdrop-blur-sm'>
// <nav className='fixed flex w-full'>
//   <p className='text-lg'>
//     <Link className='text-2xl text-stone-400 hover:text-white' href='/'>
//       Kyle Lee
//     </Link>
//   </p>
//   {navItems.map((navItem) => {
//     return <NavLink key={navItem.name} navItem={navItem} />
//   })}
// </nav>
