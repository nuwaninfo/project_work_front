import { useState } from "react"
import Column from "./Column"
import AddColumn from "./AddColumn"
import kanbanBoardService from "../services/kanbanBoardService"

import { AxiosResponse } from "axios"

interface ApiResponse {
  columnCount: number
}

const KanbanBoard = () => {
  // Get the column count of Kangan board
  const [columnCount, setColumnCount] = useState<number>(0)

  // Show the Add column button intially when the board loads
  const [showAddColumnButton, setShowAddColumnButton] = useState<boolean>(true)

  // Column title
  const [columnTitle, setColumnTitle] = useState<string>("")

  const handleClick = () => {
    // Hide addColumn button and show Add column card
    setShowAddColumnButton(false)
  }

  // Close the addColumn card
  const handleAddCloumnCloseClick = () => {
    setShowAddColumnButton(true)
  }

  // Add the column to the board
  const handleAddCloumnAddClick = async () => {
    const newColumnCount = columnCount + 1

    try {
      const newObj: { columnCount: number } = { columnCount: newColumnCount }
      const response: AxiosResponse<ApiResponse> =
        await kanbanBoardService.create(newObj)

      // Check if response.data exists and has columnCount
      if (response && typeof response.data.columnCount === "number") {
        setColumnCount(response.data.columnCount)
      } else {
        console.error("Invalid response format:", response)
      }
    } catch (error) {
      console.error("Error during API call:", error)
    }
  }

  return (
    <div className="w-full h-screen p-6 shadow-xl card bg-base-100">
      <div className="card-body">
        <div className="card-actions">
          {Array.from({ length: columnCount }, (_, index) => (
            <Column key={index} columnTitle={columnTitle} />
          ))}

          {showAddColumnButton ? (
            <button className="btn btn-primary" onClick={handleClick}>
              Add column
            </button>
          ) : (
            <AddColumn
              handleAddCloumnCloseClick={handleAddCloumnCloseClick}
              handleAddCloumnAddClick={handleAddCloumnAddClick}
              setColumnTitle={setColumnTitle}
              columnTitle={columnTitle}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default KanbanBoard
