import { user } from "~/utility/signal";
import Avatar from "../chat/Avatar";
import { createEffect, Show } from "solid-js";
import { Button } from "../ui/button";
import Copyable from "../mine/Copyable";

export const navHeight = 25

const UserNav = () => {
  createEffect(() => {

  console.log(user.signal()?.public_key)
  })
  return (
    <Show when={user.signal()}>
      {u => <div class={ ` px-5 p-2 bg-gray-200 flex justify-between items-center grid-col-span-full ` }>
        <div class=" inline-flex flex-col items-center w-max ">
          <Avatar username={u().username} />
          {u().username}
        </div>
        <div>
          <Copyable toCopy={JSON.stringify(u().public_key)}>Copy my public key</Copyable>
          <Copyable toCopy={JSON.stringify(u().private_key)}>Copy my private key</Copyable>
        </div>
        <Button onclick={() => user.logout()}>Logout</Button>
      </div>}
    </Show>
  );
};

export default UserNav;
