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
  IconButton,
  Chip,
  Avatar,
  Grid
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { addMessage } from '../store/conversation'
import { useSendMessageMutation } from '../services/api'
import { Cipher } from 'crypto'

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
    const matchDelay = message.match(/^\/delay (\d+) (.+)/)
    const matchSearch = message.match(/^\/search (.+)/)
    if (matchDelay) {
      const delay = parseInt(matchDelay[1])
      const text: any = matchDelay[2]
      setTimeout(() => {
        const payload: any = { from: 'bot', text }
        dispatch(addMessage(payload))
      }, delay)
    } else if (matchSearch) {
      const text: any = matchSearch[1]
      const payload: any = {
        from: 'bot',
        text: `We can't find '${text}' in the database`
      }
      dispatch(addMessage(payload))
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <code>Commands:</code>
        </Grid>
        <Grid item xs={2}>
          <Chip label='/delay 1000 Hello' variant='outlined' />
        </Grid>
        <Grid item xs={10}>
          <code style={{ padding: 10 }}>
            Send &ldquo;Hello&rdquo; message after &ldquo;1000&rdquo; miliseconds delay
          </code>
        </Grid>

        <Grid item xs={2}>
          <Chip label='/search Tree' variant='outlined' />
        </Grid>
        <Grid item xs={10}>
          <code style={{ padding: 10 }}>
            Search word &ldquo;Tree&rdquo; in the database
          </code>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Chatbot
