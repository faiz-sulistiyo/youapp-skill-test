"use client"
import React, {useState, useEffect} from "react"
import { IoMdInformationCircle } from "react-icons/io"
import { IoWarning } from "react-icons/io5"
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
        className={`fixed flex items-center animate-fade-down text-sm gap-2 top-0 left-0 right-0 p-4 rounded-md m-4 bg-red-900 text-white ${isVisible ? "" : "hidden"}`}
      >
        <IoMdInformationCircle size={32}/> {message}
      </div>
    )
  )
}

export default Notification
