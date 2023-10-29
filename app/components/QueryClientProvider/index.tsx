'use client'

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const QueryClientProvider: React.FC<Props> = (props) => {
  const { children } = props

  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}

export default QueryClientProvider
