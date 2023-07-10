export interface Rooms {
    rooms: Room[]
    ratePlans: RatePlan[]
}
  
interface Room {
    id: string
    name: string
    longDescription: string
    occupancy: Occupancy
    disabledAccess: boolean
    bedConfiguration: string
    images: any[]
    facilities: any[]
}
  
interface Occupancy {
    maxAdults: number
    maxChildren: number
}
  
interface RatePlan {
    id: string
    shortDescription: string
    prePayment: string
}
  