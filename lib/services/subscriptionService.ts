import { api } from "../api/api";

interface Subscription {
  plan: string;
}

export const subscriptionService = {
  startSubscription: async (payload: Subscription) => {
    return api.post("/subscriptions/start", payload);
  },
  getCurrenctSubscription: async () => {
    return api.get("/subscriptions/me");
  },
};
