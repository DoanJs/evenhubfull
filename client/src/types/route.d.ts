declare module "*.png";

type RootStackParamList = {
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPassword: undefined;
  Verification: { code: string; email: string; password: string } | undefined;
  OnbroadingScreen: undefined;

  // RootScreen: NavigatorScreenParams<RootStackParamList>;
  // MainScreen: NavigatorScreenParams<MainTabParamList>;
  MainScreen: undefined;
};

// type MainTabParamList = {
//   HomeScreen: undefined;
//   //   HomeScreen: { userId: string };
// };
