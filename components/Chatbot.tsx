/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  makeStyles,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Input,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { addMessage } from '../store/conversation'
import { useSendMessageMutation } from '../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '50%',
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2)
  },
  messageList: {
    overflow: 'auto',
    maxHeight: '50vh'
  },
  messageItem: {
    padding: theme.spacing(1)
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  input: {
    flexGrow: 1
  },
  sendIcon: {
    color: theme.palette.primary.main
  },
  fromYou: {
    color: 'green'
  },
  fromBot: {
    color: 'blue'
  }
}))

const Chatbot = () => {
  const classes = useStyles()
  const conversation = useSelector((state: any) => state.conversation)
  const [message, setMessage]: any = useState('')
  const dispatch = useDispatch()
  const [sendMessage, { data }] = useSendMessageMutation()

  useEffect(() => {
    if (data) {
      console.log(data.message)
      const payload: any = { from: 'bot', text: data.message }
      dispatch(addMessage(payload))
    }
  }, [data])

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = async () => {
    const commandRegex = /^\/delay (\d+) (.+)/
    const match = message.match(commandRegex)
    if (match) {
      const delay = parseInt(match[1])
      const text: any = match[2]
      setTimeout(() => {
        const payload: any = { from: 'bot', text }
        dispatch(addMessage(payload))
      }, delay)
    } else {
      const payload: any = { from: 'you', text: message }
      dispatch(addMessage(payload))
      sendMessage(message)
    }
    setMessage('')
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <Paper className={classes.root}>
      <List className={classes.messageList}>
        {conversation.messages.map((message, index) => {
          const color = message?.from == 'bot' ? 'blue' : 'green'
          return (
            <ListItem key={index} className={classes.messageItem}>
              <ListItemText>
                <span style={{ color, textTransform: 'capitalize' }}>
                  {message?.from}
                </span>
                : {message?.text}
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
      <div className={classes.inputContainer}>
        <Input
          className={classes.input}
          placeholder='Type your message...'
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
          value={message}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={handleSendMessage}>
                <SendIcon className={classes.sendIcon} />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </Paper>
  )
}

export default Chatbot
