import { CssBaseline } from '@mui/material'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

const AppProviders: React.FC = ({ children }) => {
  return (
    <CssBaseline>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CssBaseline>
  )
}

export { AppProviders }
