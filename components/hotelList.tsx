import { Hotel } from "../interfaces/hotels"
import { Rating } from 'react-simple-star-rating'
import Image from "next/image"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import RoomList from "./roonList";

interface Props {
    hotels: Hotel[]
}

const HotelList = ({hotels}: Props) => {
    const [grabbed, setGrabbed] = useState(false)

    return (
        <div className="flex flex-col space-y-4 justify-center items-center">
            {hotels.map(hotel => (
                <div 
                    key={hotel.id} 
                    className="w-[1200px] relative"
                >
                    <div className="flex p-4 border border-black justify-between">
                        <div className="flex space-x-4">
                            <Carousel
                                showArrows={true}
                                showThumbs={false}
                                showStatus={false}
                                infiniteLoop={true}
                                dynamicHeight={false}
                                width={200}
                                emulateTouch={true}
                                className={`select-none cursor-grab ${grabbed && 'cursor-grabbing'}`}
                                onSwipeStart={setGrabbed.bind(this, true)}
                                onSwipeEnd={setGrabbed.bind(this, false)}
                            >
                                {hotel.images.map((image, index) => (
                                    <Image
                                        className="aspect-[3/2]"
                                        src={image.url}
                                        width={0}
                                        height={0}
                                        sizes="200px"
                                        quality={100}
                                        key={index}
                                        alt={`Hotel img: ${index}`}
                                    />
                                ))}
                            </Carousel>
                            <div className="flex flex-col items-start justify-start text-black">
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
                    <RoomList hotelId={hotel.id}/>
                </div>
            ))}
        </div>
    )
}

export default HotelList