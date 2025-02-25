import { user } from "~/utility/signal";
import Avatar from "../chat/Avatar";
import { onCleanup, onMount, Show } from "solid-js";
import { Button } from "../ui/button";
import Copyable from "../mine/Copyable";
import { api } from "~/utility/backend";
import { useLogout } from "~/utility/hooks";

export const navHeight = 25

const UserNav = () => {

  const logout = useLogout()

  onMount(() => {
    let userSignal = user.signal()
    if (userSignal)
    api.messages.subscribeUser(userSignal)
  })
  onCleanup(() => {
    api.messages.unsubscribeToAll()
  })
  return (
    <Show when={user.signal()}>
      {u => <div class={ ` bg-gray-800 px-5 p-2 flex justify-between items-center grid-col-span-full ` }>
        <div class=" inline-flex flex-col items-center w-max ">
          <Avatar username={u().username} />
          {u().username}
        </div>
        <div>
          <Copyable toCopy={JSON.stringify(u().public_key)}>Copy my public key</Copyable>
          <Copyable toCopy={JSON.stringify(u().private_key)}>Copy my private key</Copyable>
        </div>
        <Button onclick={logout}>Logout</Button>
      </div>}
    </Show>
  );
};

export default UserNav;
