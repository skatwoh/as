import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment2: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement2: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    incrementByAmount2: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment2, decrement2, incrementByAmount2 } = counterSlice.actions;

export default counterSlice.reducer;