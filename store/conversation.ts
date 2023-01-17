import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  messages: []
}

const conversation = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMessage: (state: any, action: any) => {
      state.messages.push(action?.payload)
    },
    clearConversation: (state: any) => {
      state.messages = []
    }
  }
})

export const { addMessage, clearConversation } = conversation.actions

export default conversation.reducer
