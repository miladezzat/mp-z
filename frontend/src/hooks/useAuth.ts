'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAppDispatch } from './redux'
import { logout } from '@/store/slices/authSlice'

export function useAuth() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    router.push('/login')
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return {
    handleLogout,
    handleNavigate,
  }
}
