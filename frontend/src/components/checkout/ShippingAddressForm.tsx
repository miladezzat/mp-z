'use client'

import { Card, CardBody, Input } from '@nextui-org/react'

interface ShippingAddressFormProps {
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ShippingAddressForm({ shippingAddress, onInputChange }: ShippingAddressFormProps) {
  return (
    <Card>
      <CardBody className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <Input
          label="Street Address"
          name="street"
          value={shippingAddress.street}
          onChange={onInputChange}
          isRequired
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            name="city"
            value={shippingAddress.city}
            onChange={onInputChange}
            isRequired
          />
          <Input
            label="State"
            name="state"
            value={shippingAddress.state}
            onChange={onInputChange}
            isRequired
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="ZIP Code"
            name="zipCode"
            value={shippingAddress.zipCode}
            onChange={onInputChange}
            isRequired
          />
          <Input
            label="Country"
            name="country"
            value={shippingAddress.country}
            onChange={onInputChange}
            isReadOnly
          />
        </div>
      </CardBody>
    </Card>
  )
}
