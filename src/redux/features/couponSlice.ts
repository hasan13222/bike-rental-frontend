import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createCouponModalOpen: "",
  updateCouponModalOpen: "",
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    changeCouponModal: (state, action) => {
      state.createCouponModalOpen = action.payload;
    },
    changeUpdateCouponModal: (state, action) => {
      state.updateCouponModalOpen = action.payload;
    },
  },
});

export const { changeCouponModal, changeUpdateCouponModal } =
  couponSlice.actions;
export default couponSlice.reducer;
