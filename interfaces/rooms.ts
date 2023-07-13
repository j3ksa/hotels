export interface Rooms {
    rooms: Room[]
    ratePlans: RatePlan[]
}
  
export interface Room {
    id: string
    name: string
    longDescription: string
    occupancy: Occupancy
    disabledAccess: boolean
    bedConfiguration: string
    images: any[]
    facilities: any[]
    shortDescription?: string
}
  
interface Occupancy {
    maxAdults: number
    maxChildren: number
    maxOverall?: number
}
  
interface RatePlan {
    id: string
    shortDescription: string
    prePayment: string
}

export interface Facility {
    code: string
    name: string
}
  