import { useQuery } from 'react-query'
import { getRoomTypes } from "../pages/api/getRoomTypes";
import { Rooms } from '../interfaces/rooms';
import Loading from './loading';

interface Props {
    hotelId: string
}

interface RoomProps {
    data: Rooms
}

const RoomList = ({hotelId}: Props) => {

    const getRoomsData = async (id: string) => {
        try {
          const { data }: RoomProps = await getRoomTypes(id)
          return data
        } catch (error) {
          console.error(error)
        }
      }
    
      const { status: roomStatus, data: roomsTypes } = useQuery(
        ['rooms', hotelId],
        () => getRoomsData(hotelId),
        { retry: 3}
      )

    return (
        <>
            {roomStatus === 'success' ?
                <>
                    {roomsTypes.rooms.map((data, index) => (
                        <div className='grid grid-cols-12 space-x-2 p-2 border border-black' key={index}>
                            <div className='col-span-2 flex flex-col items-start justify-start p-2'>
                                <p className='font-semibold'>{data.name}</p>
                                <p>Adults: {data.occupancy.maxAdults}</p>
                                <p>Children: {data.occupancy.maxChildren}</p>
                            </div>
                            <p className='col-span-10 p-2'>{data.longDescription}</p>
                        </div>
                    ))}
                </>
                :
                <Loading/>
            }
        </>

    )
}

export default RoomList