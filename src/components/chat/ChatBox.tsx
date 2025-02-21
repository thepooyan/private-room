import { Icontact } from "~/utility/interface"
import ChatInput from "./ChatInput"
import ChatView from "./ChatView"
import { Accessor } from "solid-js"

interface props {
  c: Accessor<Icontact>
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
