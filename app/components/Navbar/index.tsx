'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

type NavbarProps = {}

const Navbar: React.FC<NavbarProps> = () => {
  const path = usePathname()

  return (
    <nav className="flex items-center justify-between border-b border-zinc-700 dark:border-zinc-300 px-6 h-16 max-w-screen-2xl mx-auto">
      <Link href="/">
        <AiFillBug size={24} className="inline-block align-bottom" />

        <span className="ml-3">Issue Tracker</span>
      </Link>

      <ul className="flex items-center gap-6">
        <li>
          <Link
            href="/"
            className={`transition-all duration-300 hover:opacity-50 ${path === '/' ? 'opacity-50 underline' : ''}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/issues"
            className={`transition-all duration-300 hover:opacity-50 ${
              path === '/issues' ? 'opacity-50 underline' : ''
            }`}
          >
            Issues
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
