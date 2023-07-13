import { useQuery } from 'react-query'
import { getRoomTypes } from "../pages/api/getRoomTypes";
import { Rooms } from '../interfaces/rooms';
import Loading from './loading';
import { useCallback, useState } from 'react';
import { useFilterStore } from '../stores/useFilter';
import { useStore } from 'zustand';
import { useCollapse } from 'react-collapsed';

interface Props {
    hotelId: string
}

interface Room {
    data: Rooms
}

const RoomList = ({hotelId}: Props) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    const {
        adultCount,
        childrenCount,
    } = useStore(useFilterStore)

    const getRoomsData = async (id: string) => {
        try {
            const { data }: Room = await getRoomTypes(id)
            
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
                <div className={`${displayProperRooms().length < 3 ? 'h-fit' : 'h-[300px] sm:h-[474px]'} overflow-y-auto space-y-2 mt-2`}>
                    {displayProperRooms().map((data, index) => (
                        <div className={`grid grid-cols-12 bg-[#13112B] rounded-lg relative h-[160px] lg:min-h-[150px]`} key={index}>
                            <p className='col-span-1 flex flex-col items-center justify-center font-semibold text-base bg-[#E22566] rounded-lg'>#{index+1}</p>
                            <div className='col-span-3 flex flex-col items-start justify-center rounded-lg p-2'>
                                <p className='font-semibold text-base'>{data.name}</p>
                                <p className='text-base'>Adults: {data.occupancy.maxAdults}</p>
                                <p className='text-base'>Children: {data.occupancy.maxChildren}</p>
                            </div>
                            <p className={`col-span-8 py-2 px-4 overflow-y-hidden } ${isExpanded && 'hidden'}`}>{data.longDescription.slice(0, 350)}</p>
                            <p {...getCollapseProps()} className={`col-span-8 py-2 px-4 h-fit ${isExpanded ? 'block' : 'hidden'}`}>{data.longDescription}</p>
                            <button {...getToggleProps()} className={`absolute bottom-0 right-0 z-10 bg-[#13112B] text-[#009FE3] p-2 ${data.longDescription.length < 400 && 'hidden'}`}>
                                {isExpanded ? 'Less' : 'More'}
                            </button>
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