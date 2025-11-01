import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { EventItem } from "../../interfaces/event.interface";
import { getEnvVariables } from "../../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

export const fetchEvents: ReturnType<
  typeof createAsyncThunk<EventItem[], void>
> = createAsyncThunk<EventItem[], void>("events/fetchEvents", async () => {
  const response = await fetch(`${VITE_API_URL}/events`);
  const events = await response.json();
  return events as EventItem[];
});

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [] as EventItem[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching events";
      });
  },
});

export default eventsSlice.reducer;
