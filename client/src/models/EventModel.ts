export interface EventModel {
    authorId: string
    description: string
    endAt: number
    date: number
    imageUrl: string
    // location: Location
    locationTitle: string
    locationAddress: string
    startAt: number
    title: string
    users: string[]
    price: string
    category: string
  }
  
  export interface Location {
    address: string
    title: string
  }
  