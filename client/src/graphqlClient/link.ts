import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import JWTManager from "../utils/auth/jwt";
import { IPADDRESS, PORTSERVER } from "../utils/variables";
import { jwtDecode, JwtPayload } from "jwt-decode";

const httpLink = createHttpLink({
  uri: `http://${IPADDRESS}:${PORTSERVER}/graphql`,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  // let access_token = JWTManager.getToken();
  let access_token = await AsyncStorage.getItem("accessToken");
  // const decode = jwtDecode<JwtPayload & UserType>(access_token);
  // console.log(decode)
  // console.log(Date.now()/1000)

  console.log("linkGraphQL, accessToken -->", access_token);
  if (!access_token) {
    try {
      const result = await axios({
        method: "get",
        url: "http://localhost:5000/refresh_token",
        withCredentials: true,
      });
      access_token = result.data.access_token as string;

      JWTManager.setToken(access_token);
    } catch (error) {
      console.log("linkGraphQL: error: ", error);
    }
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : "",
    },
  };
});

export default authLink.concat(httpLink);
