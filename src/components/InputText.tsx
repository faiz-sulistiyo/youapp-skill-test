import React, {InputHTMLAttributes, SyntheticEvent} from "react"

interface IInputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string
  onChange?: (value: string) => void
  type?: string
  inputClassname?: string
  prefix?: string
}

const InputText: React.FC<IInputTextProps> = ({
  value,
  onChange,
  className,
  type = "text",
  inputClassname,
  prefix,
  ...rest
}) => {
  const handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.currentTarget.value)
    }
  }

  return (
    <div
      className={`${className} flex gap-1 w-full bg-white p-4.5 text-sm font-medium bg-opacity-5 rounded-lg`}
    >
      <input
        value={value}
        type={type}
        className={`${inputClassname} w-full bg-transparent placeholder:text-gray-4 text-white focus-within:outline-none`}
        onChange={handleOnChange}
        {...rest}
      />
      {prefix && value && <span className="text-white">{prefix}</span>}
    </div>
  )
}

export default InputText
