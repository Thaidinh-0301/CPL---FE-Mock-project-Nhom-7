import React from 'react'
import { CartButton } from './Cart'
import { AuthButton } from './Auth'

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">BookShop</h1>
          </div>
          <div className="flex items-center space-x-4">
            <CartButton />
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  )
}
