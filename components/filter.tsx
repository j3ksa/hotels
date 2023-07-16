import Image from "next/image"
import { Rating } from "react-simple-star-rating"
import { useRef } from "react"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { BiReset } from 'react-icons/bi'

import { useFilterStore } from "../stores/useFilter"
import { useStore } from "zustand"

const Filter = () => {
    const adultCounterComponent = useRef()
    const childCounterComponent = useRef()
    const {
        starValue,
        updateStarValue,
        adultCount,
        childrenCount,
        addAdult,
        addChild,
        removeAdult,
        removeChild,
        reset
    } = useStore(useFilterStore)

    const handleRating = (rate: number) => {
        updateStarValue(rate)
    }

    const removeOneAdult = () => {
        if (adultCount === 0) {
            return
        } else {
            removeAdult()
        }
    }
    const removeOneChild = () => {
        if (childrenCount === 0) {
            return
        } else {
            removeChild()
        }
    }

    const handleReset = () => {
        reset()
    }

    const canReset = starValue !== 0 || adultCount !== 0 || childrenCount !== 0
    
    return (
        <div className="w-screen h-[215px] relative mb-32 sm:mb-14 flex items-center justify-center text-black">
            <Image
                src={'/assets/guestLineWhite.png'}
                alt="Filtered hotel"
                width={0}
                height={0}
                sizes="55vw"
                quality={100}
                className="w-full sm:w-fit lg:h-full px-2 sm:px-0"
            />
            <div className="absolute -bottom-28 sm:-bottom-4 z-10 bg-[#13112B] border border-black h-30 flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 space-x-3 py-2 sm:py-0 px-2 rounded-lg text-[#009FE3]">
                <Rating
                    initialValue={starValue}
                    allowFraction={true}
                    onClick={handleRating}
                    SVGclassName="inline"
                />
                <div id='adultCounter' className="flex items-center justify-between space-x-2" ref={adultCounterComponent}>
                    <p>Adults</p>
                    <AiOutlineMinusCircle onClick={removeOneAdult} className="cursor-pointer mt-0.5"/>
                    <p className="select-none">{adultCount}</p>
                    <AiOutlinePlusCircle onClick={addAdult} className="cursor-pointer mt-0.5"/>
                </div>
                <div id='childCounter' className="flex items-center justify-between space-x-2" ref={childCounterComponent}>
                    <p>Children</p>
                    <AiOutlineMinusCircle onClick={removeOneChild} className="cursor-pointer  mt-0.5"/>
                    <p className="select-none">{childrenCount}</p>
                    <AiOutlinePlusCircle onClick={addChild} className="cursor-pointer  mt-0.5"/>
                </div>
                <button
                    className="flex items-center space-x-2"
                    disabled={!canReset}
                    onClick={handleReset}
                >
                    <BiReset className={`${!canReset && 'invisible'} text-lg`}/>
                </button>
            </div>
        </div>
    )
}

export default Filter