import { Dimensions } from "react-native";

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get("window").width,
    HEIGHT: Dimensions.get("window").height,
  },
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  daysName: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};
