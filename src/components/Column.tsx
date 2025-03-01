import AddCard from "./AddCard"
import Card from "./Card"

interface IColumnProps {
  columnId: string
  columnName: string
  handleDeleteColumn: (id: string) => void
}

const Column: React.FC<IColumnProps> = ({
  columnId,
  columnName,
  handleDeleteColumn,
}) => {
  return (
    <div className="flex flex-col h-auto shadow-xl card bg-base-100 w-96">
      {/* Dropdown container */}
      <div className="flex justify-end p-2">
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Edit</a>
            </li>
            <li>
              <a onClick={() => handleDeleteColumn(columnId)}>Delete</a>
              {/*onClick={handleDeleteColumn}*/}
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{columnName}</h2>
        <Card />
        <AddCard />
        <button className="btn btn-block">Add card</button>
      </div>
    </div>
  )
}

export default Column
