import '@radix-ui/themes/styles.css'
import './theme-config.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import AuthProvider from './components/AuthProvider'
import QueryClientProvider from './components/QueryClientProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Track your issues easily - built with Next.js, Tailwind CSS, TypeScript, Prisma and a Little Love 💓'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="light" accentColor="crimson">
              <Navbar />
              <main className="p-7 max-w-screen-2xl mx-auto">{children}</main>
              <Toaster />
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
