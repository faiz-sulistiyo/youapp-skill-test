"use client"
import React, {InputHTMLAttributes, SyntheticEvent, useState} from "react"
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5"

interface IInputPasswordProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string
  onChange: (value: string) => void
}

const InputPassword: React.FC<IInputPasswordProps> = ({
  value,
  onChange,
  className,
  ...rest
}) => {
  const [show, setShow] = useState<boolean>(false)
  const handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value)
  }

  return (
    <div className="flex flex-1 bg-white bg-opacity-5 rounded-lg p-4.5">
      <input
        value={value}
        className={`${className} flex-1 bg-transparent placeholder:text-gray-4 focus-within:outline-none  text-sm font-medium `}
        onChange={handleOnChange}
        {...rest}
        type={show ? "text" : "password"}
      />
      <button type="button" className="focus:outline-none" onClick={() => setShow(!show)}>
        {show ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20}/>}
      </button>
    </div>
  )
}

export default InputPassword
