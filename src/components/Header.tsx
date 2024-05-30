import React from 'react'
import { IoBackspace, IoChevronBack } from 'react-icons/io5'

const Header:React.FC = () => {
  return (
    <div className='flex items-center gap-2.5 px-4.5 py-3'>
        <IoChevronBack size={24} /> <div className='text-sm font-bold'>Back</div>
    </div>
  )
}

export default Header