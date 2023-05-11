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
  return fetch(config.api.restaurant.meal.list, {
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
  return fetch(`${config.api.restaurant.meal.get}?_id=${mealId}`, {
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
  return fetch(config.api.restaurant.restaurant.list, {
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
  return fetch(`${config.api.restaurant.restaurant.get}?_id=${restaurantId}`, {
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
  return fetch(config.api.restaurant.delivery.list, {
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
  return fetch(`${config.api.restaurant.delivery.get}?_id=${deliveryId}`, {
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

  return fetch(`${config.api.restaurant.get}?_id=${userId}`, {
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

  return fetch(`${config.api.restaurant.update}?_id=${userId}`, {
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

// Orders

export const getOrders = (): Promise<any> => {
  return fetch(`${config.api.restaurant.orders.list}`, {
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

export const applyOrder = (
  orderId: string,
  deliveryId: string
): Promise<any> => {
  return fetch(
    `${config.api.restaurant.orders.applyOrder}?order=${orderId}&delivery=${deliveryId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ).then(async (res: Response) => {
    const error = handleErrors(res);
    if (error) throw await error;
  });
};
