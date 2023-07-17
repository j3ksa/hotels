import Layout from '../components/layout'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { getHotels } from './api/getHotels'
import Loading from '../components/loading'
import HotelList from '../components/hotelList'
import Filter from '../components/filter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  themeColor: '#E22566',
  title: 'Hotel list challenge',
  description: 'Job task for Guestline by Łukasz Jęksa.',
  icons: {
    icon: '/favicon/favicon-32x32.png',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
}

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

  return (
    <>
      {hotelsStatus === 'success' ? 
        <Layout>
          <Head>
            <title>Guestline challenge application</title>
          </Head>
          <Filter/>
          <HotelList hotels={hotels} />
        </Layout>
        :
        <Loading/>
      }
    </>
  )
}
