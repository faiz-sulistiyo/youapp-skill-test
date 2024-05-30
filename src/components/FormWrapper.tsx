import React, {SyntheticEvent} from "react"

interface IFormWrapperProps {
  children: React.ReactNode
  onSubmit: () => void
}
const FormWrapper: React.FC<IFormWrapperProps> = ({children, onSubmit}) => {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }
  return (
    <form
      className="flex flex-col gap-4 flex-1"
      onSubmit={(e) => handleSubmit(e)}
    >
      {children}
    </form>
  )
}

export default FormWrapper
