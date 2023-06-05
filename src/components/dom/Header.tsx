'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/', path: '/' },
  { name: 'Work', href: '/work', path: 'work' },
  { name: 'Blog', href: '/blog', path: 'blog' },
]

interface NavLinkProps {
  navItem: NavItem
}
interface NavItem {
  name: string
  href: string
  path: string
}
const parsePathname = (pathname: string, path: string): boolean => {
  let splitPath: string[] = pathname.split('/')
  let isPath: boolean = false
  if (pathname === '/' && path === '/') {
    isPath = true
  } else if (splitPath.includes(path)) {
    isPath = true
  }

  return isPath
}
const NavLink = (props: NavLinkProps) => {
  const pathname = usePathname()

  const { name, href, path } = props.navItem
  const isActive = parsePathname(pathname, path)

  return (
    <Link href={href} className={isActive ? 'relative py-1 underline' : 'relative py-1'}>
      {name}
    </Link>
  )
}

const MobileNavLink = (props: NavLinkProps) => {
  const pathname = usePathname()
  const { name, href, path } = props.navItem
  const isActive = parsePathname(pathname, path)
  return (
    <Link
      key={name}
      href={href}
      className={
        isActive
          ? 'relative w-full justify-self-center border-b py-4 text-white'
          : 'relative w-full justify-self-center border-b py-4 text-stone-400'
      }
    >
      {props.navItem.name}
    </Link>
  )
}

export const Header = () => {
  const [isOpen, setOpen] = useState(false)

  const pathname = usePathname()

  return (
    //the header element's primary function is to be fixed and have a z-index of 10
    //so that the child div can have the CSS effects without overlapping the scrollbar
    <>
      <header className='fixed z-10 flex w-full'>
        <div className='mr-4 flex h-20 w-full items-center justify-center bg-neutral-800/50 px-5 backdrop-blur-sm'>
          <p className='text-lg'>
            <Link className='text-2xl text-stone-400 hover:text-white' href='/'>
              Kyle Lee
            </Link>
          </p>
          <nav className='ml-auto hidden items-center gap-2 md:flex md:gap-6'>
            {navItems.map((navItem) => {
              return <NavLink key={navItem.name} navItem={navItem} />
            })}
          </nav>

          {/*Mobile Menu*/}
          <nav className='ml-auto items-center md:hidden'>
            <button
              onClick={() => {
                setOpen(!isOpen)
              }}
              type='button'
              className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              // aria-controls='mobile-menu'
              // aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {!isOpen ? (
                <svg
                  className='block h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                </svg>
              ) : null}
              {/**/}
              {isOpen ? (
                <>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </>
              ) : null}
            </button>
          </nav>
        </div>
      </header>

      {/*Dropdown menu*/}

      {isOpen ? (
        <div className='fixed z-10 mx-auto mt-20 flex h-full w-full flex-col bg-neutral-800 px-4'>
          {navItems.map((navItem) => {
            return <MobileNavLink key={navItem.href} navItem={navItem} />
          })}
        </div>
      ) : null}
    </>
  )
}
