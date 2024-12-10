import { EventModel } from "../models/EventModel";


type RootStackParamList = {
  // Feed: { sort: 'latest' | 'top' } | undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPassword: undefined;
  Verification: { code: string; email: string; password: string } | undefined;
  OnbroadingScreen: undefined;

  // RootScreen: NavigatorScreenParams<RootStackParamList>;
  // MainScreen: NavigatorScreenParams<MainParamList>;
  MainScreen: undefined;
  SearchEvents: { isFilter: boolean };
  EventDetail: { item: EventModel };
};
