import { useQuery } from 'react-query'
import { getRoomTypes } from "../pages/api/getRoomTypes";
import { Rooms } from '../interfaces/rooms';
import Loading from './loading';
import { useCallback } from 'react';
import { useFilterStore } from '../stores/useFilter';
import { useStore } from 'zustand';
import RoomModal from './roomModal';
import { BiSolidBed } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdChildFriendly } from 'react-icons/md'

interface Props {
    hotelId: string
}

interface RoomTypes {
    data: Rooms
}

const RoomList = ({hotelId}: Props) => {

    const {
        adultCount,
        childrenCount,
    } = useStore(useFilterStore)

    const getRoomsData = async (id: string) => {
        try {
            const { data }: RoomTypes = await getRoomTypes(id)
            
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const { status: roomStatus, data: roomsTypes } = useQuery(
        ['rooms', hotelId],
        () => getRoomsData(hotelId),
        { retry: 3 }
    )
    
    const displayProperRooms = useCallback(() => {
        if(roomStatus === 'success') {
            let sortedRooms = roomsTypes.rooms

            sortedRooms = sortedRooms.filter(
                room =>
                room.occupancy.maxAdults >= adultCount &&
                room.occupancy.maxChildren >= childrenCount
            )
            return sortedRooms
        } else {
            return
        }

    }, [roomStatus, adultCount, childrenCount])

    return (
        <>
            {roomStatus === 'success' ?
                <div className={`${displayProperRooms().length < 3 ? 'h-fit' : 'h-[300px] sm:h-[500px]'} overflow-y-auto space-y-2 mt-2`}>
                    {displayProperRooms().map((data, index) => (
                        <div className={`flex item justify-between bg-[#13112B] rounded-lg relative h-[180px] lg:min-h-[150px]`} key={index}>
                            <p className='flex flex-col items-center justify-center font-semibold bg-[#E22566] rounded-lg px-3'>#{index+1}</p>
                            <div className='flex flex-col sm:flex-row sm:justify-between py-2 px-4 w-full'>
                                <div className=' flex flex-col items-start justify-center rounded-lg bg-[#13112B]'>
                                    <div className='font-semibold flex items-center'>
                                        <BiSolidBed className='mr-1'/>
                                        {data.name}
                                    </div>
                                    <div className='flex items-center'>
                                        <BsFillPersonFill className='mr-1'/>
                                        Adults: {data.occupancy.maxAdults}
                                    </div>
                                    <div className='flex items-center'>
                                        <MdChildFriendly className='mr-1'/>
                                        Children: {data.occupancy.maxChildren}
                                    </div>
                                </div>
                                <p className={`overflow-y-hidden text-sm sm:w-[70%] `}>{data.shortDescription ? data.shortDescription : data.longDescription}</p>
                            </div>
                            <RoomModal roomInfo={data}/>
                        </div>
                    ))}
                    {displayProperRooms().length === 0 && 
                    <div className='flex flex-col items-center justify-center p-2 bg-[#e22567] h-[150px]'>
                        <p className='text-lg font-bold'>No exact matches</p>
                        <p>Change or remove some filters.</p>
                    </div>
                    }
                </div>
                :
                <Loading/>
            }
        </>

    )
}

export default RoomList