import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import Chatbot from '../components/Chatbot'

const Index = () => {
  return (
    <Provider store={store}>
      <Chatbot />
    </Provider>
  )
}

export default Index
