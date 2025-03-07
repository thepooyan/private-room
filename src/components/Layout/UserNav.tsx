import { user } from "~/utility/signal";
import Avatar from "../chat/Avatar";
import { onCleanup, onMount, Show } from "solid-js";
import { Button } from "../ui/button";
import Copyable from "../mine/Copyable";
import { api } from "~/utility/backend";
import { useDeleteAccount, useLogout } from "~/utility/hooks";
import { callModal } from "../modal/Modal";

export const navHeight = 25

const UserNav = () => {

  const logout = useLogout()
  const da = useDeleteAccount()

  const logoutConfirm = () => {
    callModal.prompt("Logging out, you will not be able to log back in, if you don't have your Public and Private keys. Are you sure?")
    .yes(logout)
  }
  const deleteAccount = () => {
    callModal.prompt("Your account will be deleted permanently. Are you sure?")
    .yes(da)
  }

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
      {u => <div class={ ` bg-zinc-900  px-5 p-4 flex justify-between items-center  ` }>
        <div class=" inline-flex gap-4 ">
          <Avatar username={u().username} />
          <div class=" text-sm flex flex-col justify-center text-zinc-300 ">
            <p>
              <span class="text-xs text-zinc-500">Username: </span>{u().username}
            </p>
            <p>
              <span class="text-xs text-zinc-500">Public key: </span>
              <Copyable toCopy={JSON.stringify(u().public_key)}/>
            </p>
            <p>
              <span class="text-xs text-zinc-500">Private key: </span>
              <Copyable toCopy={JSON.stringify(u().private_key)}/>
            </p>
          </div>
        </div>
        <div class="space-x-2">
          <Button onclick={logoutConfirm} variant="secondary">Logout</Button>
          <Button onclick={deleteAccount} variant="destructive">Delete account</Button>
        </div>
      </div>}
    </Show>
  );
};

export default UserNav;
