import React from "react"

interface ICardProps {
  cardName: string
}

const Card: React.FC<ICardProps> = ({ cardName }) => {
  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow">
      <p>{cardName}</p>
    </div>
  )
}

export default Card
