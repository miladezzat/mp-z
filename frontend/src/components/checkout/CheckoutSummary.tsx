'use client'

import { Card, CardBody, Button, Divider } from '@nextui-org/react'

interface CheckoutSummaryProps {
  subtotal: number
  tax: number
  shipping: number
  total: number
  isLoading?: boolean
  onCheckout: () => void
}

export function CheckoutSummary({
  subtotal,
  tax,
  shipping,
  total,
  isLoading,
  onCheckout,
}: CheckoutSummaryProps) {
  return (
    <Card className="sticky top-24">
      <CardBody className="space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <Divider />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        </div>
        <Divider />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
        <Button
          color="primary"
          size="lg"
          className="w-full"
          onPress={onCheckout}
          isLoading={isLoading}
        >
          Place Order
        </Button>
      </CardBody>
    </Card>
  )
}
