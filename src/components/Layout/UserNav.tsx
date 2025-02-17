import { user } from "~/utility/signal";
import Avatar from "../chat/Avatar";
import { Show } from "solid-js";
import { Button } from "../ui/button";

const UserNav = () => {
  return (
    <Show when={user.signal()}>
      {user => <div class=" px-5 p-2 bg-gray-200 flex justify-between items-center mb-4">
        <div class=" inline-flex flex-col items-center w-max ">
          <Avatar username={user().username} />
          {user().username}
        </div>
        <Button class="">Logout</Button>
      </div>}
    </Show>
  );
};

export default UserNav;
