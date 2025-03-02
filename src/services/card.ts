import axios, { AxiosResponse } from "axios"
const baseUrl: string = "/api/v1/column"
interface ApiCard {
  _id: string
  cardName: string
}

interface ApiCardResponse {
  cards: ApiCard[]
}
let token: string | null = null

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

// Add Card
const create = async (newObject: {
  cardName: string
  columnId: string
}): Promise<AxiosResponse<ApiCardResponse>> => {
  const config = {
    headers: { Authorization: token },
  }

  const response: AxiosResponse<ApiCardResponse> = await axios.post(
    `${baseUrl}/${newObject.columnId}/card`, // Correct endpoint for adding a card
    newObject,
    config
  )
  return response
}

// Get all cards from the database for a given column
const getAll = async (
  columnId: string
): Promise<AxiosResponse<ApiCardResponse>> => {
  const config = {
    headers: { Authorization: token },
  }

  const response: AxiosResponse<ApiCardResponse> = await axios.get(
    `${baseUrl}/${columnId}/card`,
    config
  )
  return response
}
/*
const deleteColumn = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  }

  const response: AxiosResponse<ApiColumnResponse> = await axios.delete(
    `${baseUrl}/${id}`,
    config
  )
  return response
}
*/
export default { getAll, setToken, create }
