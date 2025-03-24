import { createSlice } from "@reduxjs/toolkit";

interface TBikeState {
  createBikeModalOpen: string;
  updateBikeModalOpen: string;
  showBikes: Record<string, any>[];
  page: number;
}
const initialState: TBikeState = {
  createBikeModalOpen:"",
  updateBikeModalOpen:"",
  showBikes: [],
  page: 1
};

const bikeSlice = createSlice({
  name: "bike",
  initialState,
  reducers: {
    changeBikeModal: (state, action) => {
      state.createBikeModalOpen = action.payload;
    },
    changeUpdateBikeModal: (state, action) => {
      state.updateBikeModalOpen = action.payload;
    },
    setShowBikes: (state, action) => {
      state.showBikes = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  },
});

export const {changeBikeModal, changeUpdateBikeModal, setShowBikes, setPage} = bikeSlice.actions;
export default bikeSlice.reducer;
