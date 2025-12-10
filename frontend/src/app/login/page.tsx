'use client'

import { Card, CardBody, CardHeader, Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { loginSchema, type LoginInput } from '@/schemas/auth.schema'
import { useLoginMutation } from '@/store/api/authApi'
import { useAppDispatch } from '@/hooks/redux'
import { setCredentials } from '@/store/slices/authSlice'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      const result = await login(data).unwrap()
      dispatch(setCredentials(result as any))
      toast.success('Login successful!')
      router.push('/products')
    } catch (err: any) {
      toast.error(err?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 px-6 pt-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-default-500">Sign in to your account</p>
        </CardHeader>
        <CardBody className="px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="Enter your email"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button type="submit" color="primary" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
            <div className="text-center text-sm text-default-500">
              Demo credentials: john.doe@example.com / password123
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
