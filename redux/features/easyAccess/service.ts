import axiosInstance from "@/redux/apis/common/aixosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- Types ---
interface FetchDataPlansArgs {
  network?: string; // optional, can be used as query
  category?: string; // SME, gifting, etc.
  serviceType?: string;
}

interface PlansResponse {
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
type PurchaseAirtimePayload = {
  planId: string;
  phone: string;
  userId: string;
  pinCode: string;
  amount: string;
  airtimeType: string;
};

type PurchaseAirtimeResponse = {
  message?: string;
  error?:string;
  transactionId: string;
};

// --- Async Thunks ---

// Fetch available plans from our DB (not directly from EasyAccess)
export const fetchDataPlans = createAsyncThunk<
  PlansResponse,
  FetchDataPlansArgs,
  { rejectValue: string }
>(
  "dataPlans/fetchDataPlans",
  async ({ network, category }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      // params.append("serviceType", serviceType);
      if (network) params.append("network", network);
      if (category) params.append("category", category);

      const response = await axiosInstance.get(
        `/plans/plans?${params.toString()}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch plans"
      );
    }
  }
);

export const fetchDataCategories = createAsyncThunk<
  string[],
  {
    serviceType: "airtime" | "data" | "cable";
    network: string;
  },
  { rejectValue: string }
>(
  "dataPlans/fetchDataCategories",
  async ({ serviceType, network }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("serviceType", serviceType);
      params.append("network", network);

      const response = await axiosInstance.get(
        `/plans/categories?${params.toString()}`
      );

      return response.data.categories;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch categories"
      );
    }
  }
);

// Purchase data bundle
export const purchaseData = createAsyncThunk<
  { message: string; transactionId: string, error:string }, // 👈 include transactionId
  {
    planId: string;
    phone: string;
    userId: string;
    pinCode: string;
    networkId?: string;
    dataType?: string;
    amount?: string;
  },
  { rejectValue: { message: string; transactionId?: string } }
>("dataPlans/purchaseData", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      "/easyaccess/purchase-data",
      payload
    );

    return {
      message: response.data.message,
      transactionId: response.data.transactionId,
    };
  } catch (err: any) {
    const errorData = err?.response?.data;

    return rejectWithValue({
      message: errorData?.message || "Purchase failed",
      error:errorData.error,
      transactionId: errorData?.transactionId || "",
    });
  }
});

export const purchaseAirtime = createAsyncThunk<
  PurchaseAirtimeResponse,
  PurchaseAirtimePayload,
  { rejectValue: PurchaseAirtimeResponse }
>("dataPlans/purchaseAirtime", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      "/easyaccess/purchase-airtime",
      payload
    );
    return {
      message: response.data.message,
      transactionId: response.data.transactionId,
    };
  } catch (err: any) {
    const errorData = err?.response?.data;

    return rejectWithValue({
      message: errorData?.message || "Purchase failed",
      error:errorData.error,
      transactionId: errorData?.transactionId || "",
    });
  }
});

// Verify meter (unchanged)
export const handleVerifyTvSub = createAsyncThunk(
  "services/handleVerifyTvSub",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/easyaccess/verify-tvsub",
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "TvSub verification failed"
      );
    }
  }
);

export const purchaseTvSub = createAsyncThunk(
  "dataPlans/purchaseTvSub",
  async ({ payload }: { payload: any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/easyaccess/purchase-tvsub",
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Cable subscription failed"
      );
    }
  }
);

// Verify meter (unchanged)
export const handleVerifyMeter = createAsyncThunk(
  "services/handleVerifyMeter",
  async (payload: Electricity, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/easyaccess/verify-meter",
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Meter verification failed"
      );
    }
  }
);

export const purchaseElectricity = createAsyncThunk(
  "dataPlans/purchaseElectricity",
  async ({ payload }: { payload: any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/easyaccess/purchase-electricity",
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Cable subscription failed"
      );
    }
  }
);

export const purchaseExam = createAsyncThunk(
  "dataPlans/purchaseExam",
  async ({ payload }: { payload: any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/easyaccess/purchase-exam",
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Purchase exam failed"
      );
    }
  }
);

export const getDataServices = createAsyncThunk(
  "services/getDataServices",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/subservices");
      const allServices = response.data;

      // filter for only data type
      const dataServices = allServices.filter(
        (item: any) => item.serviceId?.type === data
      );

      // image map
      const serviceImages: Record<string, string> = {
        mtn: "/images/mtn.png",
        airtel: "/images/airtel.png",
        glo: "/images/glo.jpg",
        "9mobile": "/images/9mobile.jpeg",
      };

      // attach images
      const dataWithImages = dataServices.map((item: any) => {
        const key = item.name
          .split(" ")[0]
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();

        return {
          ...item,
          image: serviceImages[key] || "/images/default.png",
        };
      });

      console.log(dataWithImages, "images");

      return dataWithImages;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch data services!"
      );
    }
  }
);

export const getCableServices = createAsyncThunk(
  "services/getCableServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/subservices");
      const allServices = response.data;

      // filter for only data type
      const dataServices = allServices.filter(
        (item: any) => item.serviceId?.type === "cable"
      );

      // image map
      const serviceImages: Record<string, string> = {
        dstv: "/images/dstv.jpeg",
        gotv: "/images/gotv.png",
        startimes: "/images/startime.jpeg",
        showmax: "/images/showmax.jpg",
      };

      // attach images
      const dataWithImages = dataServices.map((item: any) => {
        const key = item.name
          .split(" ")[0]
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();

        return {
          ...item,
          image: serviceImages[key] || "/images/default.png",
        };
      });

      console.log(dataWithImages, "data");

      return dataWithImages;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch data services!"
      );
    }
  }
);

export const getElectricityServices = createAsyncThunk(
  "services/getElectricityServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/subservices");
      const allServices = response.data;

      // Filter: check for electricity type
      // Adjust this depending on whether your backend returns `serviceId.type`
      const electricityServices = allServices.filter(
        (item: any) =>
          item.serviceId?.type?.toLowerCase() === "electricity" ||
          item.type?.toLowerCase() === "electricity"
      );

      console.log(electricityServices, "electricity");

      // Map images for DisCos
      const serviceImages: Record<string, string> = {
        ikejaelectric: "/images/discos/ikeja.png",
        ekoelectric: "/images/discos/eko.png",
        abujaelectric: "/images/discos/abuja.png",
        kadunaelectric: "/images/discos/kaduna.png",
        kanoelectric: "/images/discos/kano.png",
        jos: "/images/discos/jos.png",
        portharcourt: "/images/discos/ph.png",
        benin: "/images/discos/benin.png",
        ibadan: "/images/discos/ibadan.png",
        enugu: "/images/discos/enugu.png",
      };

      // Attach image to each
      const dataWithImages = electricityServices.map((item: any) => {
        const key = item.name
          .split(" ")[0] // take the first word
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();

        return {
          ...item,
          image: serviceImages[key] || "/images/default.png",
        };
      });

      return dataWithImages;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch electricity services!"
      );
    }
  }
);

export const getExamServices = createAsyncThunk(
  "services/getExamServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/subservices");
      const allServices = response.data;

      // Filter for only exam-type services
      const examServices = allServices.filter(
        (item: any) => item.serviceId?.type === "exam"
      );

      // Map service names to image paths
      const serviceImages: Record<string, string> = {
        // jamb: "/images/jamb.png",
        waec: "/images/weac.jpg",
        neco: "/images/neco.jpg",
        nabteb: "/images/nabteb.png",
      };

      // Attach images to each service
      const dataWithImages = examServices.map((item: any) => {
        const key = item.name
          .split(" ")[0] // take the first word
          .replace(/[^a-zA-Z0-9]/g, "") // remove non-alphanumeric
          .toLowerCase();

        return {
          ...item,
          image: serviceImages[key] || "/images/default.png",
        };
      });

      return dataWithImages;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch exam services!"
      );
    }
  }
);

// --- Slice State ---
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
        state.purchaseError = action.payload?.error;
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
        state.purchaseError = action.payload?.error;
      })


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
      });
  },
});

export const { clearPlans, clearPurchaseStatus } = dataPlansSlice.actions;
export default dataPlansSlice.reducer;
