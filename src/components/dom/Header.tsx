import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'Blog', href: '/blog' },
]

const NavLink = (props) => {
  const pathName = usePathname()
  const { name, href } = props.navItem
  return (
    <Link href={href} className={pathName === href ? 'relative py-1 underline' : 'relative py-1'}>
      {name}
    </Link>
  )
}

export const Header = ({ params }) => {
  return (
    <header className='z-10 mr-4 items-center bg-slate-800 fixed w-full h-20 flex px-10'>
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
    </header>
  )
}
