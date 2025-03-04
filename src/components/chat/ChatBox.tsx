import { Iuser } from "~/utility/interface"
import ChatInput from "./ChatInput"
import ChatView from "./ChatView"
import { Accessor } from "solid-js"

interface props {
  c: Accessor<Iuser>
}
const ChatBox = ({c}:props) => {
  return (
    <div class=" flex justify-between flex-col  ">
      <ChatView c={c}/>
      <ChatInput c={c}/>
    </div>
  )
}

export default ChatBox
