import axios, { Method } from "axios";
import { IPADDRESS, PORTSERVER } from "../variables";

const AxiosAPI = (method: Method, endpoint: string, data: any) => {
  return axios({
    method,
    url: `http://${IPADDRESS}:${PORTSERVER}/${endpoint}`,
    data,
    withCredentials: true,
    headers: {
      Authorization: "Bearer ", //+ JWTManager.getToken(),
    },
  });
};
export default AxiosAPI