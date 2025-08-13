import React, { useEffect } from 'react'
import { useUIStore } from '../store'

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
)

const InfoIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
)

const ExclamationIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.317 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
  </svg>
)

const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
)

const NotificationItem = ({ notification }) => {
  const { removeNotification } = useUIStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(notification.id)
    }, 5000) // Auto remove after 5 seconds

    return () => clearTimeout(timer)
  }, [notification.id, removeNotification])

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckIcon className="text-white" />
      case 'error':
        return <ExclamationIcon className="text-white" />
      case 'warning':
        return <ExclamationIcon className="text-white" />
      default:
        return <InfoIcon className="text-white" />
    }
  }

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div className={`${getBackgroundColor()} text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 max-w-sm w-full`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
        <button
          onClick={() => removeNotification(notification.id)}
          className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
        >
          <XIcon />
        </button>
      </div>
    </div>
  )
}

export const NotificationContainer = () => {
  const { notifications } = useUIStore()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}
