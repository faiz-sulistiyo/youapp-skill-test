"use client"
import React, {useState, useEffect} from "react"
interface INotificationProps {
  message: string
  show: boolean
  onClose: () => void
}
const Notification: React.FC<INotificationProps> = ({
  message,
  show,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 2000) // Hide after 3 seconds
  
      return () => {
        clearTimeout(timer)
        setIsVisible(true)
      }
    }
  }, [show,onClose])

  return (
    show && (
      <div
        className={`fixed top-0 left-0 right-0 p-4 bg-gray-900 text-white ${
          isVisible ? "" : "hidden"
        }`}
      >
        {message}
      </div>
    )
  )
}

export default Notification
