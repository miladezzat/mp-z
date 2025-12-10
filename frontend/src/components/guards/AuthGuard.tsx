'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/hooks/redux'
import { toast } from 'sonner'
import { Spinner } from '@nextui-org/react'

interface AuthGuardProps {
  children: React.ReactNode
  fallbackUrl?: string
  message?: string
}

export default function AuthGuard({
  children,
  fallbackUrl = '/login',
  message = 'Please login to access this page',
}: AuthGuardProps) {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      toast.error(message)
      router.push(fallbackUrl)
    }
  }, [isClient, isAuthenticated, router, fallbackUrl, message])

  // Show loading spinner while mounting or redirecting
  if (!isClient || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return <>{children}</>
}
