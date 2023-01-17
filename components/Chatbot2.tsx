import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, Paper } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from './conversation'

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
    maxHeight: '40vh'
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
  }
}))

const Chatbot = () => {
  const classes = useStyles()
  const conversation = useSelector((state) => state.conversation)
  const [message, setMessage] = React.useState('')
  const dispatch = useDispatch()

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (message) {
      dispatch(addMessage(message))
      setMessage('')
    }
  }

  return (
    <Paper className={classes.root}>
      <List className={classes.messageList}>
        {conversation.messages.map((message, index) => (
          <ListItem key={index} className={classes.messageItem}>
            <ListItemText>{message.text}</ListItemText>
          </ListItem>
        ))}
      </List>
      <div className={classes.inputContainer}>
        <Input
          className={classes.input}
          placeholder='Type your message...'
          onChange={handleMessageChange}
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
