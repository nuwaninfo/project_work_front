import React from "react"

interface IColumnProps {
  columnName: string
}

const Column: React.FC<IColumnProps> = ({ columnName }) => {
  return (
    <div className="shadow-xl card bg-base-100 w-96">
      <div className="card-body">
        <h2 className="card-title">{columnName}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default Column
