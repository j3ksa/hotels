import { Hotel } from "../interfaces/hotels"
import { Rating } from 'react-simple-star-rating'
import Image from "next/image"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useCallback, useState } from "react";
import RoomList from "./roonList";
import { useFilterStore } from "../stores/useFilter";
import { useStore } from "zustand";

interface Props {
    hotels: Hotel[]
}

const HotelList = ({hotels}: Props) => {
    const [grabbed, setGrabbed] = useState(false)

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
            {displayProperHotels().map(hotel => (
                <div 
                    key={hotel.id} 
                    className="w-[95vw] lg:w-[1000px] relative"
                >
                    <div className="flex flex-col sm:flex-row p-4 bg-gradient-to-b from-[#e22567ee] to-[#dd4d80] items-center sm:items-start justify-between rounded-lg">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-4">
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
                            <div className="flex flex-col items-start justify-start">
                                <p className="text-xl font-semibold">{hotel.name}</p>
                                <p>{hotel.address1}<span></span></p>
                                <p>{hotel.address2}<span></span></p>
                            </div>
                        </div>
                        <Rating
                            initialValue={Number(hotel.starRating)}
                            readonly={true}
                            SVGclassName="inline"
                        />
                    </div>
                    <RoomList hotelId={hotel.id} />
                </div>
            ))}
        </div>
    )
}

export default HotelList