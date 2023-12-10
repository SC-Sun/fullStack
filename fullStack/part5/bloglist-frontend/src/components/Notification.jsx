const Notification = ({ message }) => {
  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: !message ? null : message.type === 'error' ? 'red' : 'green',
    marginBottom: 10,
  }

  return message ? (
    <div
      className={message.type === 'error' ? 'error' : 'success'}
      style={messageStyle}
      id='notification'
    >
      {message.message}
    </div>
  ) : null
// eslint-disable-next-line semi
};

export default Notification