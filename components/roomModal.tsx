import { Room } from '../interfaces/rooms';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { useState, Fragment } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import facilities from '../data/facilities';
import { Facility } from '../interfaces/rooms';
import FacilityImage from './facilityImage';
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    roomInfo: Room
}

const RoomModal = ({roomInfo}: Props) => {
    const [grabbed, setGrabbed] = useState(false)
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    if (!roomInfo) return

    return (
        <>
            <button onClick={setOpen.bind(this, true)} className={`absolute bottom-0 right-0 z-10 bg-[#13112B] text-[#009FE3] font-bold p-2`}>
                More
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className={`fixed z-50 inset-0 overflow-y-auto`}
                    onClose={handleClose}
                >
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <span
                            className="hidden"
                            aria-hidden="true"
                        />
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 "
                            enterTo="opacity-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 "
                            leaveTo="opacity-0 translate-y-4"
                        >
                        <div className="inline-block align-bottom bg-[#1b1c5e] text-white rounded-lg text-left overflow-y-auto transform transition-all w-[500px] h-fit max-h-[90vh]">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="flex items-center text-lg leading-6 font-medium bg-[#13112B] h-[56px] w-full p-2">
                                    <Image
                                    width={0}
                                    height={0}
                                    sizes="160px"
                                    className="h-10 w-auto hidden sm:block"
                                    alt="guestline logo"
                                    src="/assets/guestLineWhite.png"
                                    />
                                    <p className='ml-2 text-xs sm:text-sm'>{roomInfo.id} {roomInfo.name}</p>
                                    <AiOutlineCloseCircle onClick={handleClose} className='text-xl cursor-pointer ml-auto'/>
                                </div>
                                <div className='w-full flex flex-col justify-start items-center h-fit rounded-b-lg py-2'>
                                    <Carousel
                                        showArrows={true}
                                        showThumbs={false}
                                        showStatus={false}
                                        infiniteLoop={true}
                                        dynamicHeight={false}
                                        emulateTouch={true}
                                        autoPlay={true}
                                        className={`select-none cursor-grab w-[200px] sm:w-[300px] ${grabbed && 'cursor-grabbing'}`}
                                        onSwipeStart={setGrabbed.bind(this, true)}
                                        onSwipeEnd={setGrabbed.bind(this, false)}
                                    >
                                        {roomInfo.images.map((image, index) => (
                                            <Image
                                                className="aspect-[3/2]"
                                                src={image.url}
                                                width={0}
                                                height={0}
                                                sizes="300px"
                                                quality={100}
                                                key={index}
                                                alt={`Room img: ${index}`}
                                            />
                                        ))}
                                    </Carousel>
                                    {roomInfo.images.length === 0 &&
                                        <Image
                                            className="aspect-[3/2] w-[200px] sm:w-[300px]"
                                            src={'/assets/noImageAvailable.jpg'}
                                            width={0}
                                            height={0}
                                            sizes="300px"
                                            quality={100}
                                            alt={`Room img not available`}
                                        />
                                    }
                                    <div className='w-full flex flex-col items-start justify-between space-y-2 mt-2 px-6'>
                                        <div className='w-full flex flex-col sm:flex-row items-center justify-around'>
                                            <p>
                                                Adults: {roomInfo.occupancy.maxAdults}
                                            </p>
                                            <p>
                                                Children: {roomInfo.occupancy.maxChildren}
                                            </p>
                                        </div>
                                        <div className='w-full flex flex-col sm:flex-row items-center justify-around'>
                                            <p>
                                                {roomInfo.bedConfiguration === "None" ? 'Bed configuration not available' : `Bed type:  ${roomInfo.bedConfiguration}`}
                                            </p>
                                            <p>
                                                Disabled access: {roomInfo.disabledAccess ? 'Yes' : 'No'}
                                            </p>
                                        </div>
                                        <p className='text-justify text-sm'>
                                            {roomInfo.longDescription}
                                        </p>
                                        <p className='text-lg font-semibold bg-[#E22566] w-full px-2 rounded-lg'>
                                            Facilities:
                                        </p>
                                        {roomInfo.facilities.length === 0 &&
                                            <p className='w-full'>No information about facilities</p>
                                        }
                                        <div className='grid grid-cols-2 w-full gap-2 px-2'>
                                            {roomInfo.facilities.map((facility: Facility) => (
                                                <div key={facility.code} className='flex items-center space-x-1 even:place-self-stretch even:justify-start even:sm:justify-end text-xs'>
                                                    <FacilityImage Icon={facilities[Number(facility.code) - 1].icon} />
                                                    <p>{facility.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default RoomModal