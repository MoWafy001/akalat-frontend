import { config } from "../config";

const handleErrors = (res: Response) => {
  if (!(res.status >= 200 && res.status < 300)) {
    // if unauthorized, remove token and user from localStorage
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw new Error("Unauthorized");
    }

    return res.json();
  }
};

export const listMeals = (): Promise<any> => {
  return fetch(config.api.user.meal.list, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if(error) throw await error
    return res.json();
  });
};

export const listRestaurants = (): Promise<any> => {
  return fetch(config.api.user.restaurant.list, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if(error) throw await error
    return res.json();
  });
};

export const listDeliveries = (): Promise<any> => {
  return fetch(config.api.user.delivery.list, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if(error) throw await error
    return res.json();
  });
};

export const getCurrentUser = (): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(`${config.api.user.get}?_id=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if(error) throw await error
    return res.json();
  });
};

export const updateCurrentUser = (data: any): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(`${config.api.user.update}?_id=${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if(error) throw await error
    return res.json();
  });
};

export const getCart = (): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(`${config.api.user.cart.get}?user=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if(error) throw await error
    return res.json();
  });
};

export const addToCart = (mealId: string, quantity: number): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(
    `${config.api.user.cart.add}?user=${userId}&meal=${mealId}&quantity=${quantity}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ).then(async (res: Response) => {
    const error = handleErrors(res);
    if(error) throw await error
    return res.json();
  });
};

export const getWishlist = (): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(`${config.api.user.wishlist.get}?user=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if(error) throw await error
    return res.json();
  });
};
