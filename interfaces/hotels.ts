export interface Hotel {
    id: string
    name: string
    description: string
    address1: string
    address2: string
    postcode: string
    town: string
    countryCode: string
    country: string
    facilities: Facility[]
    telephone: string
    email: string
    images: Image[]
    checkInHours: string
    checkInMinutes: string
    checkOutHours: string
    checkOutMinutes: string
    position: Position
    starRating: string
}
  
interface Facility {
    code: string
}
  
interface Image {
    url: string
}
  
interface Position {
    latitude: number
    longitude: number
    timezone: string
}
  