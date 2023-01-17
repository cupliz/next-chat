import { configureStore } from '@reduxjs/toolkit'
import conversation from './conversation'
import { api } from '../services/api'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    conversation
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export default store
