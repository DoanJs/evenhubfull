export interface EventModel {
    authorId: string
    description: string
    endAt: number
    imageUrl: string
    location: Location
    startAt: number
    title: string
    users: string[]
    price: string
  }
  
  export interface Location {
    address: string
    title: string
  }
  