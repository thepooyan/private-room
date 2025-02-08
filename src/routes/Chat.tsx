import { user } from "~/utility/signal"

const Chat = () => {
  return (
    <>
      username: {user.signal()?.username}
    </>
  )
}

export default Chat
