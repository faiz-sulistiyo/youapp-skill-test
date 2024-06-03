"use client"
import React, {useMemo, useState} from "react"
import {IoClose} from "react-icons/io5"

interface IInputChipProps {
  value: string[]
  onChange: (val: string[]) => void
}
const InputChip: React.FC<IInputChipProps> = ({value, onChange}) => {
  const [textValue, setValue] = useState<string>("")
  const [chips, setChips] = useState<string[]>(value)

  const items = useMemo(() => {
    return chips
  }, [chips])

  return (
    <div className="bg-white bg-opacity-5 rounded-xl px-4 py-2 flex flex-wrap gap-2">
      {items.map((item, i) => {
        return (
          <div
            className="relative flex gap-1.5 bg-white bg-opacity-5 text-white rounded-md items-center px-2 py-1"
            key={i}
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={() => {
                const val = chips.filter((i) => item !== i)
                setChips(val)
                onChange(val)
              }}
            >
              <IoClose />
            </button>
          </div>
        )
      })}
      <input
        type="text"
        value={textValue}
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
        onKeyDown={(e) => {
            if (e.key === "Enter" && textValue) {
                const val = [...chips, textValue]  // Create a new array with the new chip
                setChips(val)
                setValue("")
                onChange(val)
              }
              if (e.key === "Backspace" && textValue === "") {
                const val = chips.slice(0, -1) // Create a new array excluding the last chip
                setChips(val)
                onChange(val)
              }
        }}
        className="appearance-none bg-transparent outline-none focus-within:outline-none"
      />
    </div>
  )
}

export default InputChip
