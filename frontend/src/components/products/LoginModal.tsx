'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter()

  const handleSignIn = () => {
    onClose()
    router.push('/login')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Sign In Required</ModalHeader>
        <ModalBody>
          <p className="text-default-600">
            You need to be signed in to add items to your cart. Would you like to sign in now?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Continue Browsing
          </Button>
          <Button color="primary" onPress={handleSignIn}>
            Sign In
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
