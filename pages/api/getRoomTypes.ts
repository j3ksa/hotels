import axios from 'axios'

export const getRoomTypes = async (id: string) => {
  const url = `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${id}`
  const response = await axios.get(url)
  return response
}