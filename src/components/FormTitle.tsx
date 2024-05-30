import React from 'react'
interface IFormTitleProps {
    text:string
    className?:string
}
const FormTitle:React.FC<IFormTitleProps> = ({text,className}) => {
  return (
    <h1 className={`${className} text-2xl font-bold`}>{text}</h1>
  )
}

export default FormTitle