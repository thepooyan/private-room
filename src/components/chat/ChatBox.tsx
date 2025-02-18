import { contact } from "~/utility/interface"
import ChatInput from "./ChatInput"
import ChatView from "./ChatView"

interface props {
  c: contact
}
const ChatBox = ({c}:props) => {
  return (
    <>
      <ChatView/>
      <ChatInput/>
    </>
  )
}

export default ChatBox
