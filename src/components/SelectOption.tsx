import React, {SelectHTMLAttributes} from "react"
import {IoChevronDown} from "react-icons/io5"

interface ISelectOptionProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {label: string; value: string}[]
  className?: string,
}
const SelectOption: React.FC<ISelectOptionProps> = ({
  options,
  className,
  onChange,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <select
        {...props}
        className={`${className} w-full bg-white focus-within:outline-none p-4.5 text-sm font-medium bg-opacity-5 rounded-lg dark:[color-scheme:dark] !appearance-none`}
      >
        <option hidden defaultValue="Select Gender" disabled>
          Select Gender
        </option>
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value} className="text-sm text-gray-4">
              {item.label}
            </option>
          )
        })}
      </select>
      <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2"/>
    </div>
  )
}

export default SelectOption
