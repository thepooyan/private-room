import { Icontact } from "~/utility/interface"
import Msg from "./Msg"
import { api } from "~/utility/backend"
import { createEffect, For, Show } from "solid-js"

interface props {
  c: Icontact
}
const ChatView = ({c}:props) => {
  const [msgs] = api.messages.getLiveResource(c)
  createEffect(() => {
    console.log(msgs())
  })
  return (
    <div class="p-5 px-7">
      <Show when={msgs()}>
        {ms => <For each={ms().items}>{i => <Msg isRightSide={i.sender !== c.id}>{i.content}</Msg>}</For>}
      </Show>
      <Show when={!msgs()}>
        "No messages yet!"
      </Show>
    </div>
  )
}

export default ChatView
