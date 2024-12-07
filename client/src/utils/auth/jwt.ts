import { jwtDecode, JwtPayload } from "jwt-decode";
import { userVar } from "../../graphqlClient/cache";

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
    userVar(user)

    setRefreshTokenTimeout(Number(decode.exp) - Number(decode.iat));
  };

  const getRefreshToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/refresh_token", {
        credentials: "include",
      });
      const data = (await response.json()) as {
        access_token: string;
      };

      setToken(data.access_token);
      return true;
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  const setRefreshTokenTimeout = (delay: number) => {
    refreshTokenTimeoutId = window.setTimeout(
      getRefreshToken,
      delay * 1000 - 5000
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
