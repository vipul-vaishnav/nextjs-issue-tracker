'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <SessionProvider>{children}</SessionProvider>
    </React.Fragment>
  )
}

export default AuthProvider
