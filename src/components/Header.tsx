"use client"
import {useRouter} from "next/navigation"
import React from "react"
import {IoChevronBack} from "react-icons/io5"

interface IHeaderProps {
  name?: string
  onClickBack?: () => void
  rightButton?: React.ReactNode
  rightClassname?: string
}
const Header: React.FC<IHeaderProps> = ({
  name,
  onClickBack,
  rightButton,
  rightClassname,
}) => {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center px-4.5">
      <button
        className="flex flex-1 items-center gap-2.5 py-3 focus:outline-none text-sm font-bold"
        onClick={() => {
          if (onClickBack) {
            onClickBack()
          } else {
            router.back()
          }
        }}
      >
        <IoChevronBack size={24} /> <div className="">Back</div>
      </button>
      <span className="self-center">{name && "@" + name}</span>
      <div className={`${rightClassname} flex-1`}>{rightButton}</div>
    </div>
  )
}

export default Header
