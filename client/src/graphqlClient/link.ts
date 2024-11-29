import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { IPADDRESS, PORTSERVER } from "../utils/variables";
import JWTManager from '../utils/auth/jwt'
import axios from "axios";

const httpLink = createHttpLink({
  uri: `http://${IPADDRESS}:${PORTSERVER}/graphql`,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let access_token = JWTManager.getToken();
  console.log('access_token -->', access_token)
  if (!access_token) {
    try {
      const result = await axios({
        method: "get",
        url: "http://localhost:5000/refresh_token",
        withCredentials: true,
      });
      access_token = result.data.access_token as string

      JWTManager.setToken(access_token)
    } catch (error) {
      console.log(error)
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