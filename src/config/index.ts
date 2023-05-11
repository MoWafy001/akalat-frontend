const API_HOST = "http://localhost:4000/";
const API_URL = API_HOST + "api/v1/";

export const config = {
  api: {
    host: API_HOST,
    url: API_URL,
    // User
    user: {
      register: API_URL + "user/register",
      login: API_URL + "user/login",
      meal: {
        list: API_URL + "user/meal/list",
        get: API_URL + "user/meal/get",
      },
      restaurant: {
        list: API_URL + "user/restaurant/list",
        get: API_URL + "user/restaurant/get",
      },
      delivery: {
        list: API_URL + "user/delivery/list",
        get: API_URL + "user/delivery/get",
      },
      get: API_URL + "user/get",
      update: API_URL + "user/update",
      cart: {
        get: API_URL + "user/cart/get",
        add: API_URL + "user/cart/item",
        delete: API_URL + "user/cart/item",
        checkout: API_URL + "user/order/checkout",
        flush: API_URL + "user/cart/flush",
      },
      wishlist: {
        get: API_URL + "user/wishlist/get",
        add: API_URL + "user/wishlist/item",
        delete: API_URL + "user/wishlist/item",
      },
      orders: {
        list: API_URL + "user/order/list",
        accept: API_URL + "user/order/accepteOrder",
      },
    },
    // Restaurant
    restaurant: {
      register: API_URL + "restaurant/register",
      login: API_URL + "restaurant/login",
      meal: {
        list: API_URL + "restaurant/meal/list",
        get: API_URL + "restaurant/meal/get",
        create: API_URL + "restaurant/meal/create",
        addImage: API_URL + "restaurant/meal/addImage",
      },
      delivery: {
        list: API_URL + "restaurant/delivery/list",
        get: API_URL + "restaurant/delivery/get",
      },
      get: API_URL + "restaurant/get",
      update: API_URL + "restaurant/update",
      orders: {
        list: API_URL + "restaurant/order/list",
        accept: API_URL + "restaurant/order/accepteOrder",
        applyOrder: API_URL + "restaurant/order/applyOrder",
      },
    },
    // Delivery
    delivery: {
      register: API_URL + "delivery/register",
      login: API_URL + "delivery/login",
      get: API_URL + "delivery/get",
      update: API_URL + "delivery/update",
      orders: {
        list: API_URL + "delivery/order/list",
        checkout: API_URL + "delivery/order/checkout",
      },
      meal: {
        get: API_URL + "delivery/meal/get",
      },
      restaurant: {
        get: API_URL + "delivery/restaurant/get",
      },
    },
  },
};
