import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'; // Import counterReducer
import counterReducer2 from './counterSlice2'; // Import counterReducer

export default configureStore({
  reducer: {
    counter: counterReducer,
    counter2: counterReducer2
  },
})