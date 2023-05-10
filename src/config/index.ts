const API_HOST = "http://localhost:4000/";
const API_URL = API_HOST + "api/v1/";

export const config = {
  api: {
    host: API_HOST,
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
        add: API_URL + "user/cart/item",
      },
      wishlist: {
        get: API_URL + "user/wishlist/get",
        add: API_URL + "user/wishlist/item",
      },
    },
  },
};
