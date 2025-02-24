import React from "react"
import Column from "./Column"
import AddColumn from "./AddColumn"

const KanbanBoard = ({ handleClick, columnCount }) => {
  return (
    <div className="w-full h-screen p-6 shadow-xl card bg-base-100">
      <div className="card-body">
        <div className="card-actions">
          <AddColumn />
          {Array.from({ length: columnCount }, (_, index) => (
            <Column key={index} />
          ))}
          <button className="btn btn-primary" onClick={handleClick}>
            Add column
          </button>
        </div>
      </div>
    </div>
  )
}

export default KanbanBoard
