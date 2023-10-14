import { configureStore } from '@reduxjs/toolkit'
import userSlice from './ReduxSlices/userSlice'

export default configureStore({
  reducer: {
    user: userSlice
  }
})