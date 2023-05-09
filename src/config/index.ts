const API_URL = "http://localhost:4000/api/v1/";

export const config = {
  api: {
    url: API_URL,
    user: {
      register: API_URL + "user/register",
      login: API_URL + "user/login",
      meal: {
        list: API_URL + "user/meal/list",
      },
      restaurant: {
        list: API_URL + "user/restaurant/list",
      },
      delivery: {
        list: API_URL + "user/delivery/list",
      },
      get: API_URL + "user/get",
      update: API_URL + "user/update",
      cart: {
        get: API_URL + "user/cart/get",
      },
    },
  },
};
