import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createBikeModalOpen:"",
  updateBikeModalOpen:"",
  showBikes: []
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
    }
  },
});

export const {changeBikeModal, changeUpdateBikeModal, setShowBikes} = bikeSlice.actions;
export default bikeSlice.reducer;
