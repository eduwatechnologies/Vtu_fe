import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDataPlans,
  purchaseData,
  purchaseAirtime,
  getDataServices,
  getCableServices,
  getElectricityServices,
  getExamServices,
  sendA2CAirtime,
  verifyA2COtp,
  sendA2COtp,
} from "./serviceThunk";

interface DataPlansState {
  plans: any[];
  loading: boolean;
  error: string | null;
  purchaseStatus: string | null;
  purchaseLoading: boolean;
  purchaseError: string | null;
  dataServices: any[];
  cableServices: any[];
  electricityServices: any[];
  examServices: any[];
  a2cLoading: boolean;
  a2cError: string | null;
  a2cStatus: string | null;
  a2cIdentifier: string | null;
  a2cSessionId: string | null;
}

const initialState: DataPlansState = {
  plans: [],
  dataServices: [],
  cableServices: [],
  electricityServices: [],
  examServices: [],
  loading: false,
  error: null,
  purchaseStatus: null,
  purchaseLoading: false,
  purchaseError: null,
  a2cLoading: false,
  a2cError: null,
  a2cStatus: null,
  a2cIdentifier: null,
  a2cSessionId: null,
};

const dataPlansSlice = createSlice({
  name: "dataPlans",
  initialState,
  reducers: {
    clearPlans: (state) => {
      state.plans = [];
      state.error = null;
    },
    clearPurchaseStatus: (state) => {
      state.purchaseStatus = null;
      state.purchaseError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch plans
      .addCase(fetchDataPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.plans;
      })
      .addCase(fetchDataPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })

      // Purchase data
      .addCase(purchaseData.pending, (state) => {
        state.purchaseLoading = true;
        state.purchaseStatus = null;
        state.purchaseError = null;
      })
      .addCase(purchaseData.fulfilled, (state, action) => {
        state.purchaseLoading = false;
        state.purchaseStatus = action.payload.message;
      })
      .addCase(purchaseData.rejected, (state, action) => {
        state.purchaseLoading = false;
        state.purchaseError = action.payload?.error as any;
      })

      .addCase(purchaseAirtime.pending, (state) => {
        state.purchaseLoading = true;
        state.purchaseStatus = null;
        state.purchaseError = null;
      })
      .addCase(purchaseAirtime.fulfilled, (state, action) => {
        state.purchaseLoading = false;
        state.purchaseStatus = action.payload?.message;
      })
      .addCase(purchaseAirtime.rejected, (state, action) => {
        state.purchaseLoading = false;
        state.purchaseError = action.payload?.error as any;
      })

      // .addCase(purchaseElectricity.pending, (state) => {
      //   state.purchaseLoading = true;
      //   state.purchaseStatus = null;
      //   state.purchaseError = null;
      // })
      // .addCase(purchaseElectricity.fulfilled, (state, action) => {
      //   state.purchaseLoading = false;
      //   state.purchaseStatus = action.payload?.message;
      // })
      // .addCase(purchaseElectricity.rejected, (state, action) => {
      //   state.purchaseLoading = false;
      //   // state.purchaseError = action.payload?.error as any;
      // })

      .addCase(getDataServices.fulfilled, (state, action) => {
        state.dataServices = action.payload;
      })
      .addCase(getCableServices.fulfilled, (state, action) => {
        state.cableServices = action.payload;
      })
      .addCase(getElectricityServices.fulfilled, (state, action) => {
        state.electricityServices = action.payload;
      })
      .addCase(getExamServices.fulfilled, (state, action) => {
        state.examServices = action.payload;
      })

      .addCase(sendA2COtp.pending, (state) => {
        state.a2cLoading = true;
        state.a2cError = null;
        state.a2cStatus = null;
      })
      .addCase(sendA2COtp.fulfilled, (state, action) => {
        state.a2cLoading = false;
        state.a2cStatus = action.payload.message;
        state.a2cIdentifier = action.payload.data.data.identifier; // FIXED
      })

      .addCase(sendA2COtp.rejected, (state, action) => {
        state.a2cLoading = false;
        state.a2cError = action.payload as any;
      })

      // --- A2C: VERIFY OTP ---
      .addCase(verifyA2COtp.pending, (state) => {
        state.a2cLoading = true;
        state.a2cError = null;
      })
      .addCase(verifyA2COtp.fulfilled, (state, action) => {
        state.a2cLoading = false;
        state.a2cStatus = "OTP Verified";
        state.a2cSessionId = action.payload.data.data.sessionId; // IMPORTANT
      })
      .addCase(verifyA2COtp.rejected, (state, action) => {
        state.a2cLoading = false;
        state.a2cError = action.payload as any;
      })

      // --- A2C: SEND AIRTIME ---
      .addCase(sendA2CAirtime.pending, (state) => {
        state.a2cLoading = true;
        state.a2cError = null;
      })
      .addCase(sendA2CAirtime.fulfilled, (state, action) => {
        state.a2cLoading = false;
        state.a2cStatus = action.payload.message;
      })
      .addCase(sendA2CAirtime.rejected, (state, action) => {
        state.a2cLoading = false;
        state.a2cError = action.payload as any;
      });
  },
});

export const { clearPlans, clearPurchaseStatus } = dataPlansSlice.actions;
export default dataPlansSlice.reducer;
