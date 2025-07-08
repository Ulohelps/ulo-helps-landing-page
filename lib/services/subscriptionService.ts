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
  cancelSubscription: async (payload: string) => {
    return api.post("/subscriptions/cancel", { reason: payload });
  },
};
