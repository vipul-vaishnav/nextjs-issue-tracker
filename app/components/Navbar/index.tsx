import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

type NavbarProps = {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-700 px-6 h-16 max-w-screen-2xl mx-auto">
      <Link href="/">
        <AiFillBug size={24} className="inline-block align-bottom" />

        <span className="ml-3">Issue Tracker</span>
      </Link>

      <ul className="flex items-center gap-6">
        <li>
          <Link href="/" className="transition-all duration-300 hover:opacity-50">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/issues" className="transition-all duration-300 hover:opacity-50">
            Issues
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
