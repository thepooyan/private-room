import { user } from "~/utility/signal"

const Chat = () => {
  return (
    <>
      username: {user.signal()?.username}
      {user.signal()?.public_key}
    </>
  )
}

export default Chat
