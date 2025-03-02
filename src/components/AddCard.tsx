import React from "react"

interface IAddCardProps {
  handleAddCardCloseClick: () => void
  handleAddCard: () => void
  cardName: string
  setCardName: React.Dispatch<React.SetStateAction<string>>
}

const AddCard: React.FC<IAddCardProps> = ({
  handleAddCardCloseClick,
  handleAddCard,
  cardName,
  setCardName,
}) => {
  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow">
      <input
        type="text"
        placeholder="Enter card name"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {/* Flex container with items-center and gap */}
      <button onClick={handleAddCard} className="btn btn-primary">
        Add Card
      </button>
      <button
        className="btn btn-square btn-sm"
        onClick={handleAddCardCloseClick}
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
  )
}

export default AddCard
