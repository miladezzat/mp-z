import { renderHook } from '@testing-library/react'
import { useAuth } from '../useAuth'
import { useAppDispatch } from '../redux'
import { useRouter } from 'next/navigation'

// Mock dependencies
jest.mock('../redux', () => ({
  useAppDispatch: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}))

jest.mock('@/store/slices/authSlice', () => ({
  logout: jest.fn(() => ({ type: 'auth/logout' })),
}))

describe('useAuth Hook', () => {
  const mockDispatch = jest.fn()
  const mockPush = jest.fn()
  const mockRouter = { push: mockPush }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('returns handleLogout and handleNavigate functions', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.handleLogout).toBeDefined()
    expect(result.current.handleNavigate).toBeDefined()
    expect(typeof result.current.handleLogout).toBe('function')
    expect(typeof result.current.handleNavigate).toBe('function')
  })

  it('handleNavigate navigates to the specified path', () => {
    const { result } = renderHook(() => useAuth())

    result.current.handleNavigate('/products')

    expect(mockPush).toHaveBeenCalledWith('/products')
  })

  it('handleLogout dispatches logout action and navigates to login', () => {
    const { result } = renderHook(() => useAuth())

    result.current.handleLogout()

    expect(mockDispatch).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})
