import { Iuser } from "~/utility/interface"
import ChatInput from "./ChatInput"
import ChatView from "./ChatView"
import { Accessor } from "solid-js"

interface props {
  c: Accessor<Iuser>
}
const ChatBox = ({c}:props) => {
  return (
    <div class="h-full flex justify-between flex-col pb-1">
      <ChatView c={c}/>
      <ChatInput c={c}/>
    </div>
  )
}

export default ChatBox
