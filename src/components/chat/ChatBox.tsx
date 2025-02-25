import { Iuser } from "~/utility/interface"
import ChatInput from "./ChatInput"
import ChatView from "./ChatView"
import { Accessor } from "solid-js"

interface props {
  c: Accessor<Iuser>
}
const ChatBox = ({c}:props) => {
  return (
    <>
      <ChatView c={c}/>
      <ChatInput c={c}/>
    </>
  )
}

export default ChatBox
