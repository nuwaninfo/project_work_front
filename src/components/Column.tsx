import { useState, useEffect } from "react"
import AddCard from "./AddCard"
import Card from "./Card"
import cardService from "../services/card"
import { AxiosResponse } from "axios"

interface IColumnProps {
  columnId: string
  columnName: string
  handleDeleteColumn: (id: string) => void
}

interface ApiCard {
  _id: string
  cardName: string
}

interface ApiCardResponse {
  cards: ApiCard[]
}

const Column: React.FC<IColumnProps> = ({
  columnId,
  columnName,
  handleDeleteColumn,
}) => {
  // cards array inside a column
  const [cards, setCards] = useState<ApiCard[]>([])

  // Card name
  const [cardName, setCardName] = useState<string>("")

  // State to control visibility of AddCard component
  const [showAddCard, setShowAddCard] = useState<boolean>(false)

  useEffect(() => {
    // Get the token from local storage when the page loads
    const token: string | null = window.localStorage.getItem("token")

    if (token !== null) {
      cardService.setToken(token)

      // Fetch cards from the server
      const fetchCards = async () => {
        try {
          const response: AxiosResponse<ApiCardResponse> =
            await cardService.getAll(columnId)

          // Ensure response.data.cards is an array before setting state
          if (response.data && Array.isArray(response.data.cards)) {
            setCards(response.data.cards)
            console.log("#####", response.data.cards)
          } else {
            console.error(
              "Invalid response format, expected an object with a 'columns' array:",
              response.data
            )
            setCards([]) // Ensure columns is always an array
          }
        } catch (error) {
          console.error("Error fetching columns:", error)
          setCards([]) // Prevents 'map' errors
        }
      }

      fetchCards()
    } else {
      //navigate("/login")
    }
  }, [columnId])

  // Show/hide Add card form
  const handleAddCardBtnClick = () => {
    setShowAddCard(true)
  }

  // Close the add card form
  const handleAddCardCloseClick = () => {
    setShowAddCard(false)
  }

  // Add the card to the database
  const handleAddCard = async () => {
    console.log(columnId)
    try {
      const newObj: { cardName: string; columnId: string } = {
        cardName: cardName,
        columnId: columnId,
      }
      const response: AxiosResponse<ApiCardResponse> = await cardService.create(
        newObj
      )
      if (response.data && Array.isArray(response.data.cards)) {
        setCards(response.data.cards)
        setCardName("")
        setShowAddCard(false)
      } else {
        console.error("Invalid response format:", response.data)
      }
    } catch (error) {
      console.error("Error during API call:", error)
    }
  }

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
        {cards.map((card) => (
          <Card key={card._id} cardName={card.cardName} />
        ))}

        {showAddCard && (
          <AddCard
            handleAddCardCloseClick={handleAddCardCloseClick}
            handleAddCard={handleAddCard}
            cardName={cardName}
            setCardName={setCardName}
          />
        )}
        <button
          className="btn btn-block"
          onClick={() => handleAddCardBtnClick()}
        >
          Add card
        </button>
      </div>
    </div>
  )
}

export default Column
