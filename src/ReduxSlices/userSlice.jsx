import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  },
  reducers: {
    userLoginInfo: (state, action) => {
      state.userInfo = action.payload
    }
  }
})

export const { userLoginInfo } = counterSlice.actions

export default counterSlice.reducer