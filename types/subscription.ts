export type Subscription = {
  id: string;
  careseeekerId: string;
  plan: "UNLIMITED_CONNECTIONS" | string;
  status: string;
  amount: number;
  currency: "NGN" | string;
  paystackReference: string | null;
  paystackCustomerId: string | null;
  paymentMethod: string | null;
  startDate: string | null;
  endDate: string | null;
  autoRenew: boolean;
  connectionsUsed: number;
  maxConnections: number | null;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionResponse = {
  subscription: Subscription;
  billingHistory: Subscription[];
};
