import { AiFillPlusCircle } from "solid-icons/ai";
import { Iuser } from "~/utility/interface";
import { contanctStorage, debounce } from "~/utility/utility";
import { reloadContacts } from "./contactList";
import { api } from "~/utility/backend";
import { setCurrentChat } from "~/utility/signal";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { TextField, TextFieldInput } from "../ui/text-field";
import { createSignal, For, Show } from "solid-js";
import SearchItemPreview from "./SearchItemPreview";
import Spinner from "../mine/Spinner";

const AddContact = () => {
  const [result, setResult] = createSignal<Iuser[]>([]);
  const [searching, setSearching] = createSignal(false);

  const searchRequest = async (str: string) => {
    let a = await api.users.searchByUsername(str);
    setResult(a.items);
    setSearching(false);
  };

  const d_searchReq = debounce(searchRequest, 500);

  const onKeyUp = async (str: string) => {
    if (str === "") return setResult([]);
    setSearching(true);
    d_searchReq(str);
  };
  const add = async () => {
    let pk = prompt("Public key of the guy:");
    let trg: Iuser;
    if (!pk) return;

    try {
      trg = await api.users.findByPK(pk);
    } catch (e) {
      return alert("User not found!");
    }

    let newcontact = {
      username: trg.username,
      public_key: trg.public_key,
      id: trg.id,
    };
    contanctStorage.add(newcontact);
    reloadContacts();
    setCurrentChat(newcontact);
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger class="w-full">
          <AiFillPlusCircle class="text-gray-400 hover:text-gray-500 cursor-pointer w-5 h-5 rounded-full flex justify-center items-center font-bold mx-auto my-2 " />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Add contacts:</AlertDialogTitle>
          <AlertDialogDescription>
            You can search for people by their username, and add them to your contacts.
          </AlertDialogDescription>

          <div class="space-y-2">
            <TextField>
              <TextFieldInput
                placeholder="Search by username..."
                oninput={(e) => onKeyUp(e.currentTarget.value)}
              />
            </TextField>
            <div class=" max-h-60 overflow-auto ">
              <For each={result()}>
                {(r) => <SearchItemPreview contact={r} />}
              </For>
            </div>
            <Show when={searching()}>
              <div class="p-3">
                <Spinner />
              </div>
            </Show>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddContact;
