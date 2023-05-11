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
    if (error) throw await error;
    return res.json();
  });
};

export const getMeal = (mealId: string): Promise<any> => {
  return fetch(`${config.api.user.meal.get}?_id=${mealId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
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
    if (error) throw await error;
    return res.json();
  });
};

export const getRestaurant = (restaurantId: string): Promise<any> => {
  return fetch(`${config.api.user.restaurant.get}?_id=${restaurantId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
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
    if (error) throw await error;
    return res.json();
  });
};

export const getDelivery = (deliveryId: string): Promise<any> => {
  return fetch(`${config.api.user.delivery.get}?_id=${deliveryId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
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
    if (error) throw await error;
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
    if (error) throw await error;
    return res.json();
  });
};

// Cart

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
    if (error) throw await error;
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
    if (error) throw await error;
    return res.json();
  });
};

export const removeFromCart = (
  mealId: string,
  quantity: number
): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(
    `${config.api.user.cart.delete}?user=${userId}&meal=${mealId}&quantity=${quantity}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
    return res.json();
  });
};

export const cartCheckout = (): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(`${config.api.user.cart.checkout}?user=${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
    return res.json();
  });
};

export const cartFlush = (): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(`${config.api.user.cart.flush}?user=${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
    return res.json();
  });
};

// Wishlist

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
    if (error) throw await error;
    return res.json();
  });
};

export const addToWishlist = (mealId: string): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(
    `${config.api.user.wishlist.add}?user=${userId}&meal=${mealId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
    return res.json();
  });
};

export const removeFromWishlist = (mealId: string): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(
    `${config.api.user.wishlist.delete}?user=${userId}&meal=${mealId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
    return res.json();
  });
};

// Orders

export const getOrders = (): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve([]);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(`${config.api.user.orders.list}?user=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
    return res.json();
  });
};

export const acceptOrder = (
  deliveryId: string,
  restaurantId: string,
  orderId: string
): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve([]);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(
    `${config.api.user.orders.accept}?user=${userId}&delivery=${deliveryId}&restaurant=${restaurantId}&order=${orderId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
    return res;
  });
};
