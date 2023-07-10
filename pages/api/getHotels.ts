import axios from 'axios'

export const getHotels = async () => {
  const url = 'https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG'

  const response = await axios.get(url)
  return response
}