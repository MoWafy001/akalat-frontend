const API_URL = "http://localhost:4000/api/v1/";

export const config = {
  api: {
    url: API_URL,
    user: {
      register: API_URL + "user/register",
      login: API_URL + "user/login",
    },
  },
};
