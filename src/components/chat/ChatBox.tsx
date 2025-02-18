import { contact } from "~/utility/interface"
import ChatInput from "./ChatInput"

interface props {
  c: contact
}
const ChatBox = ({c}:props) => {
  return (
    <>
      <ChatInput/>
    </>
  )
}

export default ChatBox
