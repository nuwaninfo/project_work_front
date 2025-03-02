import { useState, useEffect } from "react"
import Column from "./Column"
import AddColumn from "./AddColumn"
import kanbanBoardService from "../services/kanbanBoardService"
import columnService from "../services/column"

import { AxiosResponse } from "axios"

interface ApiResponse {
  columnCount: number
}

interface ApiColumn {
  _id: string
  columnName: string
}

interface ApiColumnResponse {
  columns: ApiColumn[]
}
const KanbanBoard = () => {
  // Get the column count of Kangan board
  const [columnCount, setColumnCount] = useState<number>(0)

  // Show the Add column button intially when the board loads
  const [showAddColumnButton, setShowAddColumnButton] = useState<boolean>(true)

  // Column name
  const [columnName, setColumnName] = useState<string>("")

  // List down columns
  const [columns, setColumns] = useState<ApiColumn[]>([])

  useEffect(() => {
    // Get the token from local storage when the page loads
    const token: string | null = window.localStorage.getItem("token")

    if (token !== null) {
      columnService.setToken(token)
      kanbanBoardService.setToken(token)

      // Fetch columns from the server
      const fetchColumns = async () => {
        try {
          const response: AxiosResponse<ApiColumnResponse> =
            await columnService.getAll()

          // Ensure response.data.columns is an array before setting state
          if (response.data && Array.isArray(response.data.columns)) {
            setColumns(response.data.columns)
            console.log("#####", response.data.columns)
          } else {
            console.error(
              "Invalid response format, expected an object with a 'columns' array:",
              response.data
            )
            setColumns([]) // Ensure columns is always an array
          }
        } catch (error) {
          console.error("Error fetching columns:", error)
          setColumns([]) // Prevents 'map' errors
        }
      }

      fetchColumns()
    } else {
      //navigate("/login")
    }
  }, [])

  const handleClick = () => {
    // Hide addColumn button and show Add column card
    setShowAddColumnButton(false)
  }

  // Close the addColumn card
  const handleAddCloumnCloseClick = () => {
    setShowAddColumnButton(true)
  }

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

    // Add the new column to the databae
    try {
      const newObj: { columnName: string } = { columnName: columnName }
      const response: AxiosResponse<ApiColumnResponse> =
        await columnService.create(newObj)

      setColumns(response.data.columns)
    } catch (error) {
      console.error("Error during API call:", error)
    }
    setShowAddColumnButton(true)
  }

  // Delete a column
  const handleDeleteColumn = async (id: string) => {
    try {
      const response = await columnService.deleteColumn(id)

      if (response.data && Array.isArray(response.data.columns)) {
        setColumns(response.data.columns)
      } else {
        console.error("Invalid response format:", response.data)
      }
    } catch (error) {
      console.error("Error deleting column:", error)
    }
  }

  return (
    <div className="w-full h-screen p-6 shadow-xl card bg-base-100">
      <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide">
        {Array.isArray(columns) && columns.length > 0 ? (
          columns.map((column) => (
            <Column
              key={column._id}
              columnId={column._id}
              columnName={column.columnName}
              handleDeleteColumn={handleDeleteColumn}
            />
          ))
        ) : (
          <p>No columns found.</p>
        )}

        {showAddColumnButton ? (
          <button
            className="w-64 min-w-[250px] flex-shrink-0 h-12 bg-blue-500 text-white rounded-lg shadow-lg flex items-center justify-center"
            onClick={handleClick}
          >
            + Add column
          </button>
        ) : (
          <AddColumn
            handleAddCloumnCloseClick={handleAddCloumnCloseClick}
            handleAddCloumnAddClick={handleAddCloumnAddClick}
            setColumnName={setColumnName}
            columnName={columnName}
          />
        )}
      </div>
    </div>
  )
}

export default KanbanBoard
