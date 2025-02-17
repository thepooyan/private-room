import { Show } from "solid-js";
import { currentChat } from "~/utility/signal";

const Chat = () => {
  return (
    <>
      <div class="bg-blue-400 w-full flex justify-center items-center">
        <Show when={!currentChat()}>Select one contact to continue</Show>
        <Show when={currentChat()}>{c => <>
          {c().username}
        </>}</Show>
      </div>
    </>
  );
};

export default Chat;
