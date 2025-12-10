'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/products')
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}
