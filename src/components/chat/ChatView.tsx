import { Icontact } from "~/utility/interface";
import Msg from "./Msg";
import { api } from "~/utility/backend";
import { Accessor, For, Show, Suspense } from "solid-js";

interface props {
  c: Accessor<Icontact>;
}
const ChatView = ({ c }: props) => {
  const { signal } = api.messages.getLiveResource(c);

  return (
    <Suspense fallback="...">
      <div class="p-5 px-7 overflow-auto h-[69dvh]">
        <Show when={signal?.data}>
          {(ms) => (
            <For each={ms().items}>
              {(i) => <Msg isRightSide={i.sender !== c().id}>{i.content}</Msg>}
            </For>
          )}
        </Show>
        <Show when={signal?.data?.items.length === 0}>"No messages yet!"</Show>
      </div>
    </Suspense>
  );
};

export default ChatView;
