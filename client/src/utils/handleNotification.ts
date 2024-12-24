import messaging from "@react-native-firebase/messaging";
import * as Notifications from 'expo-notifications';

export class HandleNotification {
  static checkNotificationPersion = async () => {
    const authStatus = await messaging().requestPermission();

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log(authStatus);
    }
  };
}
