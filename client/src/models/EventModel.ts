import { UserModel } from "./UserModel";

export interface EventModel {
  EventID: number;
  __typename: string;
  category: string;
  description: string;
  imageUrl: string;
  locationAddress: string;
  locationTitle: string;
  position: Position;
  price: string;
  title: string;
  startAt: number;
  endAt: number;
  date: number;
  createAt: number;
  updateAt: number;
  author: UserModel;
  
  users: string[];
  followers: string[];
}

export interface Position {
  __typename: string;
  lat: number;
  lng: number;
}
