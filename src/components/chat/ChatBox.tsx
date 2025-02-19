import { Icontact } from "~/utility/interface"
import ChatInput from "./ChatInput"
import ChatView from "./ChatView"

interface props {
  c: Icontact
}
const ChatBox = ({c}:props) => {
  return (
    <>
      <ChatView c={c}/>
      <ChatInput/>
    </>
  )
}

export default ChatBox
