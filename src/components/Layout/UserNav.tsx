import { user } from "~/utility/signal";
import Avatar from "../chat/Avatar";
import { Show } from "solid-js";
import { Button } from "../ui/button";

export const navHeight = 25

const UserNav = () => {
  return (
    <Show when={user.signal()}>
      {u => <div class={ ` px-5 p-2 bg-gray-200 flex justify-between items-center grid-col-span-full ` }>
        <div class=" inline-flex flex-col items-center w-max ">
          <Avatar username={u().username} />
          {u().username}
        </div>
        <Button onclick={() => user.logout()}>Logout</Button>
      </div>}
    </Show>
  );
};

export default UserNav;
