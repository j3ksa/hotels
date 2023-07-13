import { Room } from '../interfaces/rooms';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import facilities from '../data/facilities';
import { Facility } from '../interfaces/rooms';
import FacilityImage from './facilityImage';

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    chosenRoom: Room
    setChosenRoom: React.Dispatch<React.SetStateAction<Room>>
}

const RoomModal = ({open, setOpen, chosenRoom, setChosenRoom}: Props) => {
    const [grabbed, setGrabbed] = useState(false)

    const handleClose = () => {
        setChosenRoom(null)
        setOpen(false)
    }

    if (!chosenRoom) return

    return (
        <div className={`${open ?'flex' : 'hidden'} flex-col w-[500px] h-fit max-h-[90vh] lg:overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 rounded-lg`}>
            <div className='w-full flex justify-between items-center bg-[#13112B] rounded-t-lg p-4'>
                <p>{chosenRoom.id} {chosenRoom.name}</p>
                <AiOutlineCloseCircle onClick={handleClose} className='text-lg cursor-pointer'/>
            </div>
            <div className='w-full flex flex-col justify-start items-center bg-[#1b1c5e] h-fit rounded-b-lg py-2'>
                <Carousel
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                    dynamicHeight={false}
                    emulateTouch={true}
                    className={`select-none cursor-grab w-[200px] sm:w-[300px] ${grabbed && 'cursor-grabbing'}`}
                    onSwipeStart={setGrabbed.bind(this, true)}
                    onSwipeEnd={setGrabbed.bind(this, false)}
                >
                    {chosenRoom.images.map((image, index) => (
                        <Image
                            className="aspect-[3/2]"
                            src={image.url}
                            width={0}
                            height={0}
                            sizes="300px"
                            quality={100}
                            key={index}
                            alt={`Hotel img: ${index}`}
                        />
                    ))}
                </Carousel>
                <div className='w-full flex flex-col items-start justify-between space-y-2 mt-2 px-6'>
                    <div className='w-full flex items-center justify-around'>
                        <p>
                            Adults: {chosenRoom.occupancy.maxAdults}
                        </p>
                        <p>
                            Children: {chosenRoom.occupancy.maxChildren}
                        </p>
                    </div>
                    <div className='w-full flex items-center justify-around'>
                        <p>
                            {chosenRoom.bedConfiguration === "None" ? 'Bed configuration not available' : `Bed type:  ${chosenRoom.bedConfiguration}`}
                        </p>
                        <p>
                            Disabled access: {chosenRoom.disabledAccess ? 'Yes' : 'No'}
                        </p>
                    </div>
                    <p className='text-justify text-sm'>
                        {chosenRoom.longDescription}
                    </p>
                    <p className='text-lg font-semibold bg-[#E22566] w-full px-2 rounded-lg'>
                        Facilities:
                    </p>
                    <div className='grid grid-cols-2 w-full gap-2 px-2'>
                        {chosenRoom.facilities.map((facility: Facility) => (
                            <div className='flex items-center space-x-1 even:place-self-stretch even:justify-end text-xs'>
                                <FacilityImage Icon={facilities[Number(facility.code) - 1].icon} />
                                <p>{facility.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RoomModal