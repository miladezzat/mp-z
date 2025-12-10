'use client'

import { NextUIProvider } from '@nextui-org/react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { store, persistor } from '@/store'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NuqsAdapter>
          <NextUIProvider>
            <Toaster position="top-right" richColors />
            {children}
          </NextUIProvider>
        </NuqsAdapter>
      </PersistGate>
    </ReduxProvider>
  )
}
