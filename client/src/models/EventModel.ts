export interface EventModel {
  title: string;
  description: string;
  locationTitle: string;
  locationAddress: string;
  position: Position;
  imageUrl: string;
  price: string;
  users: string[];
  authorId: string;
  category: string;
  startAt: number;
  endAt: number;
  date: number;
}

export interface Position {
  lat: number;
  lng: number;
}
