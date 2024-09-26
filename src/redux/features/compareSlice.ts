import { createSlice } from "@reduxjs/toolkit";

const initialState: Record<string,any>[] = []

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    setCompareState: (state, action) => {
      if(state.length < 2){
        state.push(action.payload);
      } else{
        return [action.payload];
      }
    },
  },
});

export const { setCompareState } =
  compareSlice.actions;
export default compareSlice.reducer;
