import React, {ButtonHTMLAttributes, useMemo} from "react"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  className?: string
  disabled?: boolean
}

const Button: React.FC<IButtonProps> = ({
  text,
  className,
  disabled,
  ...props
}) => {
  const style = useMemo(() => {
    return disabled ? "opacity-30 before:opacity-0" : "before:opacity-50"
  }, [disabled])
  return (
    <button
      {...props}
      className={`${className} ${style} transition-opacity font-bold rounded-lg py-3 bg-primary-button-gradient relative focus:outline-none before:absolute before:w-full before:h-full before:-z-10 before:bg-primary-button-gradient before:right-0.5 before:top-2 before:blur-[8px] flex-1 w-full`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
