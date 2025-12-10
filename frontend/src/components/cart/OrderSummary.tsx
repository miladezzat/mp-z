'use client'

import { Card, CardBody, Button, Divider } from '@nextui-org/react'

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  total: number
  onCheckout: () => void
}

export function OrderSummary({ subtotal, shipping, total, onCheckout }: OrderSummaryProps) {
  return (
    <div>
      <Card>
        <CardBody className="space-y-4">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <Divider />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-default-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-600">Shipping</span>
              <span className="font-semibold">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <Divider />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button color="primary" className="w-full" size="lg" onPress={onCheckout}>
            Proceed to Checkout
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
