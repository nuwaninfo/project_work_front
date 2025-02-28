interface IHandleClickProp {
  handleAddCloumnCloseClick: () => void
  handleAddCloumnAddClick: () => void
  setColumnName: React.Dispatch<React.SetStateAction<string>>
  columnName: string
}

const AddColumn: React.FC<IHandleClickProp> = ({
  handleAddCloumnCloseClick,
  handleAddCloumnAddClick,
  columnName,
  setColumnName,
}) => {
  return (
    <div className="shadow-xl card bg-base-100 w-80">
      <div className="card-body">
        <p>
          <input
            type="text"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            placeholder="Enter column name"
            className="w-full max-w-xs input input-bordered"
            name="columnName"
          />
        </p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary" onClick={handleAddCloumnAddClick}>
            Add column
          </button>
          <button
            className="btn btn-square btn-outline"
            onClick={handleAddCloumnCloseClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddColumn
