import { TbSignal4G, TbSignal5G, TbVideo, TbFridge, TbDisabled, Tb24Hours, TbAirConditioningDisabled, TbToolsKitchen2, TbPlant, TbBowl } from 'react-icons/tb'
import { PiTelevisionSimple } from 'react-icons/pi'
import { BsTelephone, BsSafe, BsMusicPlayerFill, BsWifi, BsWindowFullscreen, BsWater } from 'react-icons/bs'
import { LuRadioTower } from 'react-icons/lu'
import { FiCoffee } from 'react-icons/fi'
import { GiRobe, GiCompactDisc, GiCookingPot, GiWashingMachine, GiBed, GiWaveCrest } from 'react-icons/gi'
import { MdOutlineRoomService, MdSatelliteAlt, MdIron, MdBathtub, MdBalcony, MdRoomService } from 'react-icons/md'
import { BiRadio, BiWind } from 'react-icons/bi'
import { FaHotTub, FaGamepad } from 'react-icons/fa'

const facilities = [
    {   
        icon: TbSignal4G,
        "code":"1",
        "name":"Internet Access"
    },
    {   
        icon: TbSignal5G,
        "code":"2",
        "name":"High Speed Internet Access"
    },
    {   
        icon: PiTelevisionSimple,
        "code":"3",
        "name":"TV"
    },
    {
        icon: BsTelephone,
        "code":"4",
        "name":"Telephone"
    },
    {
        icon: TbVideo,
        "code":"5",
        "name":"Video"
    },
    {
        icon: LuRadioTower,
        "code":"6",
        "name":"TV / Radio"
    },
    {
        icon: FiCoffee,
        "code":"7",
        "name":"Tea / Coffee Making Facilities"
    },
    {
        icon: TbFridge,
        "code":"8",
        "name":"Mini Bar"
    },
    {
        icon: MdOutlineRoomService,
        "code":"9",
        "name":"Room Service (Restricted Hours)"
    },
    {
        icon: GiRobe,
        "code":"10",
        "name":"Bathrobes"
    },
    {
        icon: BiRadio,
        "code":"11",
        "name":"Radio"
    },
    {
        icon: MdSatelliteAlt,
        "code":"12",
        "name":"TV with Satellite channels"
    },
    {
        icon: BsSafe,
        "code":"13",
        "name":"In-room Safe"
    },
    {
        icon: TbDisabled,
        "code": "14",
        "name": "Disabled Access / Facilities"
    },
    {
        icon: Tb24Hours,
        "code":"15",
        "name":"24 Hour Room Service"
    },
    {
        icon: BiWind,
        "code":"16",
        "name":"Hair Dryer"
    },
    {
        icon: TbAirConditioningDisabled,
        "code":"17",
        "name":"Air Conditioning"
    },
    {
        icon: GiCompactDisc,
        "code": "18",
        "name": "DVD Player"
    },
    {
        icon: MdBathtub,
        "code":"19",
        "name":"Hot Tub"
    },
    {
        icon: GiCookingPot,
        "code": "20",
        "name": "Cooking Facilities"
    },
    {
        icon: GiWashingMachine,
        "code": "21",
        "name": "Washing Facilities"
    },
    {
        icon: BsMusicPlayerFill,
        "code":"22",
        "name":"iPod Docking Station"
    },
    {
        icon: BsWifi,
        "code": "23",
        "name": "WIFI"
    },
    {
        icon: MdIron,
        "code":"24",
        "name":"Ironing Facilities"
    },
    {
        icon: FaHotTub,
        "code":"25",
        "name":"Jacuzzi Bath"
    },
    {
        icon: BsWindowFullscreen,
        "code": "26",
        "name": "Dishwasher"
    },
    {
        icon: GiBed,
        "code":"27",
        "name":"4 Poster Bed"
    },
    {
        icon: TbBowl,
        "code":"28",
        "name":"Kitchen Utensils"
    },
    {
        icon: TbPlant,
        "code":"29",
        "name":"Garden"
    },
    {
        icon: FaGamepad,
        "code": "30",
        "name": "Games Console"
    },
    {
        icon: MdBalcony,
        "code":"31",
        "name":"Balcony"
    },
    {
        icon: TbToolsKitchen2,
        "code": "32",
        "name": "Fully Equipped Kitchen"
    },
    {
        icon: MdRoomService,
        "code":"33",
        "name":"24 Hour Reception"
    },
    {
        icon: GiWaveCrest,
        "code":"34",
        "name":"Sea View"
    },
    {
        icon: BsWater,
        "code":"35",
        "name":"Lake View"
    }
]

export default facilities