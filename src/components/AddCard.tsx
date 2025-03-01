const AddCard = () => {
  return (
    <div className="w-full text-black bg-gray-100 card">
      <div className="card-body">
        <p>
          <textarea
            placeholder="Enter title"
            className="w-full textarea textarea-sm"
          ></textarea>
        </p>
        <div className="justify-end card-actions">
          <button className="btn btn-sm">Add card</button>
          <button className="btn-sm btn-square btn-outline">
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

export default AddCard
