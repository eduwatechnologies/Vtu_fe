// --- Types ---
export interface FetchDataPlansArgs {
  network?: string; // optional, can be used as query
  category?: string; // SME, gifting, etc.
  serviceType?: string;
}

export interface PlansResponse {
  message: string;
  plans: any[]; // now a flat array from your DB, each with id, name, price etc.
}

export interface Electricity {
  company: string;
  metertype: string;
  meterno: string;
  amount: string;
  phone: string;
}

// typescript types
export type PurchaseAirtimePayload = {
  planId: string;
  phone: string;
  userId: string;
  pinCode: string;
  amount: string;
  airtimeType: string;
};

export type PurchaseAirtimeResponse = {
  message?: string;
  error?: string;
  transactionId: string;
};
