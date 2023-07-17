import { Hotel } from "../interfaces/hotels"
import { Rating } from 'react-simple-star-rating'
import Image from "next/image"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useCallback, useState, useEffect } from "react";
import RoomList from "./roomList";
import { useFilterStore } from "../stores/useFilter";
import { useStore } from "zustand";
import { BiMap, BiSolidCity } from 'react-icons/bi'
import { AiOutlineClockCircle, AiFillClockCircle, AiOutlineMail, AiFillPhone} from 'react-icons/ai'
import Link from "next/link";

interface Props {
    hotels: Hotel[]
}

const HotelList = ({hotels}: Props) => {
    const [grabbed, setGrabbed] = useState(false)
    const [copied, setCopied] = useState(false)

    const {
        starValue,
    } = useStore(useFilterStore)

    const displayProperHotels = useCallback(() => {
        let sortedHotels = hotels

        sortedHotels = sortedHotels.filter(
            hotel =>
            Number(hotel.starRating) >= starValue
        )
        return sortedHotels
    }, [hotels, starValue])

    useEffect(() => {
        setTimeout(setCopied.bind(false), 2000)
    }, [copied])

    return (
        <div className="flex flex-col space-y-4 justify-center items-center">
            <p className="w-[95vw] lg:w-[1000px]">{starValue === 0 ? 'All hotels available' : `Available ${displayProperHotels().length} hotels with ${starValue} or more stars`}</p>
            {displayProperHotels().map(hotel => (
                <div 
                    key={hotel.id} 
                    className="w-[95vw] lg:w-[1000px] relative"
                >
                    <div className="relative flex flex-col sm:min-h-[260px] sm:flex-row p-4 bg-gradient-to-b from-[#e22567ee] to-[#dd4d80] items-center justify-between rounded-lg">
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
                            {hotel.images.map((image, index) => (
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
                        <div className="flex flex-col items-center sm:items-start w-full px-2">
                            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-between mb-2 sm:mb-0">
                                <div className="flex flex-col items-center sm:items-start justify-start space-y-0.5 max-[400px]:text-sm">
                                    <p className="text-xl font-semibold">{hotel.name}</p>
                                    <div className="flex items-center">
                                        <BiMap className="mr-1"/>
                                        {hotel.address1}
                                    </div>
                                    <div className={`flex items-center ${!hotel.address2 && 'hidden'}`}>
                                        <BiMap className="mr-1"/>
                                        {hotel.address2}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <BiSolidCity className="mr-1"/>
                                        <span>{hotel.town}</span>
                                        <span>{hotel.country}</span>
                                        <span>{hotel.postcode}</span>
                                    </div>
                                    <div className="flex max-[400px]:flex-col items-center justify-center space-x-2">
                                        <div className="flex items-center space-x-1 relative group cursor-default select-none">
                                            <AiOutlineClockCircle/>
                                            <p className="sm:hidden">Check in at</p>
                                            <span>{hotel.checkInHours} :</span>
                                            <span>{hotel.checkInMinutes}</span>
                                            <p className="px-1 py-1 bg-gray-700 absolute -top-6 left-1/3 sm:left-[4px] hidden group-hover:block rounded-lg text-xs truncate">Check in</p>
                                        </div>
                                        <div className="flex items-center space-x-1 relative group cursor-default select-none">
                                            <AiFillClockCircle/>
                                            <p className="sm:hidden">Check out at</p>
                                            <span>{hotel.checkOutHours} :</span>
                                            <span>{hotel.checkOutMinutes}</span>
                                            <p className="px-1 py-1 bg-gray-700 absolute -top-6 left-1/3 sm:left-[2px] hidden group-hover:block rounded-lg text-xs truncate">Check out</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center sm:items-start">
                                    <Rating
                                        initialValue={Number(hotel.starRating)}
                                        readonly={true}
                                        SVGclassName="inline"
                                    />
                                    <div className="flex items-center space-x-1 relative group">
                                        <AiOutlineMail/>
                                        <Link href={`mailto:${hotel.email}`}>{hotel.email}</Link>
                                        <p className="px-1 py-1 bg-gray-700 absolute -top-6 -left-2 hidden group-hover:block rounded-lg text-xs truncate">Click to open email application</p>
                                    </div>
                                    <div onClick={setCopied.bind(this, true)} onMouseLeave={setCopied.bind(this, false)} className="relative group cursor-pointer">
                                        <p onClick={() => navigator.clipboard.writeText(hotel.telephone)} className="flex items-center">
                                            <AiFillPhone className="mr-1"/>
                                            {hotel.telephone}
                                        </p>
                                        <p className={`px-1 py-1 bg-gray-700 absolute -top-6 left-1/3 group-hover:block rounded-lg text-xs ${copied ? 'block' : 'hidden'}`}>{copied ? 'Copied' : 'Copy'}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm lg:text-base">{hotel.description}</p>
                        </div>
                    </div>
                    <RoomList hotelId={hotel.id} />
                </div>
            ))}
        </div>
    )
}

export default HotelList