import { Iuser } from "~/utility/interface";
import Msg from "./Msg";
import { api } from "~/utility/backend";
import { Accessor, For, Show, Suspense } from "solid-js";
import { useMutationState } from "@tanstack/solid-query";

interface props {
  c: Accessor<Iuser>;
}
const ChatView = ({ c }: props) => {
  const { signal } = api.messages.getAllReactive(c);

  let variables = useMutationState<string>(()=>({
    filters: {mutationKey: ["mutateMsgs", c().id], status: "pending"},
    select: (mutation) => mutation.state.variables as string
  }))

  return (
    <Suspense fallback="...">
      <div class="p-5 px-7 overflow-auto ">
        <Show when={signal?.data}>
          {(ms) => (
            <For each={ms().items}>
              {(i) => <Msg isRightSide={i.sender !== c().id}>{i.content}</Msg>}
            </For>
          )}
        </Show>
        <Show when={variables()}>
          {vful => <For each={vful()}>{vitem => <Msg isTemp isRightSide>{vitem}</Msg>}</For>}
        </Show>
        <Show when={signal?.data?.items.length === 0 && variables().length === 0}>
          <div class=" w-full h-full flex justify-center items-center text-zinc-500 text-sm ">No messages yet</div>
        </Show>
      </div>
    </Suspense>
  );
};

export default ChatView;
