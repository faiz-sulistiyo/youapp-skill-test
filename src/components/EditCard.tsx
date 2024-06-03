import React from "react"
import {FaEdit} from "react-icons/fa"

interface IEditCard {
  title: string
  isEdit: boolean
  isEmpty: boolean
  emptyText: string
  onClickEdit: () => void
  onClickSave: () => void
  children:React.ReactNode;
}

const EditCard: React.FC<IEditCard> = ({
  title,
  emptyText,
  isEdit,
  isEmpty,
  children,
  onClickEdit,
  onClickSave,
}) => {
  return (
    <div className="bg-primary-3 pt-3 pb-6 px-7 rounded-xl flex flex-col text-sm">
      <div className="flex flex-1 justify-between items-center font-bold">
        <span>{title}</span>
        {isEdit ? (
          <button onClick={() => onClickSave()} className="bg-gradient-gold text-transparent bg-clip-text font-medium">Save & Update</button>
        ) : (
          <button onClick={() => onClickEdit()}>
            <FaEdit />
          </button>
        )}
      </div>
      {isEmpty ? <p>{emptyText}</p> : (children)}
    </div>
  )
}

export default EditCard
