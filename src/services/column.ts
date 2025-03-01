import axios, { AxiosResponse } from "axios"
const baseUrl: string = "/api/v1/column"
interface ApiColumn {
  _id: string
  columnName: string
}

interface ApiColumnResponse {
  columns: ApiColumn[]
}
let token: string | null = null

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

// Add column
const create = async (newObject: {
  columnName: string
}): Promise<AxiosResponse<ApiColumnResponse>> => {
  const config = {
    headers: { Authorization: token },
  }

  const response: AxiosResponse<ApiColumnResponse> = await axios.post(
    baseUrl,
    newObject,
    config
  )
  return response
}

// Get all columns from the database for a given user
const getAll = async (): Promise<AxiosResponse<ApiColumnResponse>> => {
  const config = {
    headers: { Authorization: token },
  }

  const response: AxiosResponse<ApiColumnResponse> = await axios.get(
    baseUrl,
    config
  )
  return response
}

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

export default { create, getAll, setToken, deleteColumn }
