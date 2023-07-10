import Layout from '../components/layout'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { getHotels } from './api/getHotels'
import Loading from '../components/loading'
import HotelList from '../components/hotelList'

export default function Index() {
  
  const getHotelsData = async () => {
    try {
      const { data } = await getHotels()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const { status: hotelsStatus, data: hotels } = useQuery(
    'hotels',
    getHotelsData,
    { retry: 3 }
  )

  console.log('data', hotels)

  return (
    <>
      {hotelsStatus === 'success' ? 
        <Layout>
          <Head>
            <title>Guestline challenge application</title>
          </Head>
          <HotelList hotels={hotels} />
        </Layout>
        :
        <Loading/>
      }
    </>
  )
}
