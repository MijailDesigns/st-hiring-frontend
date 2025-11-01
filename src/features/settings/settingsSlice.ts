import type { AsyncThunk } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GetSetting,
  UpdateBody,
  UpdateSetting,
} from "../../interfaces/setting.interface";
import { getEnvVariables } from "../../helpers/getEnvVariables";

export interface SettingsState {
  data: GetSetting | null;
  loading: boolean;
  error: string | null;
  clientId: number | null;
}

const initialState: SettingsState = {
  data: null,
  loading: false,
  error: null,
  clientId: null,
};

const { VITE_API_URL } = getEnvVariables();

// Fetch settings
export const fetchSettings: ReturnType<
  typeof createAsyncThunk<GetSetting, number>
> = createAsyncThunk("settings/fetchSettings", async (clientId: number) => {
  const res = await fetch(`${VITE_API_URL}/api/settings/${clientId}`);
  return res.json();
});

export const updateSettings: AsyncThunk<
  UpdateSetting,
  { clientId: number; settings: UpdateBody },
  object
> = createAsyncThunk<UpdateSetting, { clientId: number; settings: UpdateBody }>(
  "settings/updateSettings",
  async ({ clientId, settings }) => {
    const res = await fetch(`${VITE_API_URL}/api/settings/${clientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    return res.json();
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching settings";
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        if (state.data && action.payload && action.payload.data) {
          state.data = { ...state.data, ...action.payload.data };
        }
      });
  },
});

export const { setClientId } = settingsSlice.actions;
export default settingsSlice.reducer;
