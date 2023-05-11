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

export const getMeal = (mealId: string): Promise<any> => {
  return fetch(`${config.api.delivery.meal.get}?_id=${mealId}`, {
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
  return fetch(`${config.api.delivery.restaurant.get}?_id=${restaurantId}`, {
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

  return fetch(`${config.api.delivery.get}?_id=${userId}`, {
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

  return fetch(`${config.api.delivery.update}?_id=${userId}`, {
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
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const userId = user._id;

  return fetch(`${config.api.delivery.orders.list}?delivery=${userId}`, {
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

export const checkout = (
  customerId: string,
  restaurantId: string,
  orderId: string
): Promise<any> => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return Promise.resolve(null);
  }
  const user = JSON.parse(userJSON);
  const deliveryId = user._id;

  return fetch(
    `${config.api.delivery.orders.checkout}?delivery=${deliveryId}&user=${customerId}&restaurant=${restaurantId}&order=${orderId}`,
    {
      method: "PUT",
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
