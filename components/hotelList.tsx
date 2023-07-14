import { Hotel } from "../interfaces/hotels"
import { Rating } from 'react-simple-star-rating'
import Image from "next/image"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useCallback, useState } from "react";
import RoomList from "./roonList";
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
console.log(hotels)
    const {
        starValue
    } = useStore(useFilterStore)

    const displayProperHotels = useCallback(() => {
        let sortedHotels = hotels

        sortedHotels = sortedHotels.filter(
            hotel =>
            Number(hotel.starRating) >= starValue
        )
        return sortedHotels
    }, [hotels, starValue])

    return (
        <div className="flex flex-col space-y-4 justify-center items-center">
            <p className={`px-3 py-1 hidden ${copied && 'block'}`}>Copied</p>
            {displayProperHotels().map(hotel => (
                <div 
                    key={hotel.id} 
                    className="w-[95vw] lg:w-[1000px] relative"
                >
                    <div className="relative flex flex-col sm:min-h-[216px] sm:flex-row p-4 bg-gradient-to-b from-[#e22567ee] to-[#dd4d80] items-center justify-between rounded-lg">
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
                            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
                                <div className="flex flex-col items-start justify-start">
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
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-1">
                                            <AiOutlineClockCircle/>
                                            <span>{hotel.checkInHours} :</span>
                                            <span>{hotel.checkInMinutes}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <AiFillClockCircle/>
                                            <span>{hotel.checkOutHours} :</span>
                                            <span>{hotel.checkOutMinutes}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Rating
                                        initialValue={Number(hotel.starRating)}
                                        readonly={true}
                                        SVGclassName="inline"
                                    />
                                    <div className="flex items-center space-x-1">
                                        <AiOutlineMail/>
                                        <Link href={`mailto:${hotel.email}`}>{hotel.email}</Link>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <AiFillPhone/>
                                        {/* <span>{hotel.telephone}</span> */}
                                        <Link href={`tel::${hotel.telephone}`}>{hotel.telephone}</Link>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm">{hotel.description}</p>
                        </div>
                    </div>
                    <RoomList hotelId={hotel.id} />
                </div>
            ))}
        </div>
    )
}

export default HotelList