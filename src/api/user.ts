import { config } from "../config";

export const listMeals = (): Promise<any> => {
  return fetch(config.api.user.meal.list, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res: Response) => res.json());
};

export const listRestaurants = (): Promise<any> => {
  return fetch(config.api.user.restaurant.list, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res: Response) => res.json());
};

export const listDeliveries = (): Promise<any> => {
  return fetch(config.api.user.delivery.list, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res: Response) => res.json());
};
