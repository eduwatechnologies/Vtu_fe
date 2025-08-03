import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/user/userSlice";
import serviceReducer from "./features/services/serviceSlice";
import transactionReducer from "./features/transaction/transactionSlice";
import walletReducer from "./features/wallet/walletSlice";
import notificationReducer from "./features/notifications/notificationSlice";
import easyAccessdataPlansReducer from "./features/easyAccess/service"; // Assuming you have this reducer imported

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
  transactions: transactionReducer,
  wallets: walletReducer,
  notifications: notificationReducer,
  easyAccessdataPlans: easyAccessdataPlansReducer, // Assuming you have this reducer imported
});

// Create store
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
