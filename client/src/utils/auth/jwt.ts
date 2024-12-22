import { jwtDecode, JwtPayload } from "jwt-decode";
import { userVar } from "../../graphqlClient/cache";
import { IPADDRESS, PORTSERVER } from "../variables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosAPI from "./callapi";

const JWTManager = () => {
  let inMemoryToken: string | null = null;
  let refreshTokenTimeoutId: number | null = null;
  let user: UserType | null = null;

  const getToken = () => inMemoryToken;

  const getUser = () => user;

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;
    const decode = jwtDecode<JwtPayload & UserType>(accessToken);
    user = {
      UserID: decode.UserID,
      Username: decode.Username,
      Password: decode.Password,
      Email: decode.Email,
    };
    userVar(user);

    setRefreshTokenTimeout(Number(decode.exp) - Number(decode.iat));
  };

  const getRefreshToken = async () => {
    try {
      const refresh_token = await AsyncStorage.getItem("refreshToken");
      AxiosAPI("POST", "refresh_token", { refresh_token })
        .then(async (res) => {
          setToken(res.data.access_token);
          await AsyncStorage.setItem("accessToken", res.data.access_token); //Phục vụ reload app or mới vào app để check
          console.log("jwt-token: ", res.data.access_token);
        })
        .catch((err) => console.log("jwt err: ", err));
      return true;
    } catch (error) {
      console.log("jwt - Error: ", error);
      return false;
    }
  };

  const setRefreshTokenTimeout = (delay: number) => {
    refreshTokenTimeoutId = window.setTimeout(
      getRefreshToken,
      delay * 1000 - 300000
    );
    return true;
  };

  const deleteToken = () => {
    inMemoryToken = null;
    if (refreshTokenTimeoutId) {
      window.clearTimeout(refreshTokenTimeoutId);
    }
  };

  return {
    getUser,
    getToken,
    setToken,
    getRefreshToken,
    deleteToken,
    refreshTokenTimeoutId,
  };
};

export default JWTManager();
