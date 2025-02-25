import { AiFillPlusCircle } from "solid-icons/ai";
import { Iuser } from "~/utility/interface";
import { debounce } from "~/utility/utility";
import { api } from "~/utility/backend";
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
  const [open, setOpen] = createSignal(false);
  

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

  return (
    <>
      <AlertDialog open={open()} onOpenChange={setOpen}>
        <AlertDialogTrigger class="w-full">
          <AiFillPlusCircle
            class="absolute right-4 bottom-2 text-zinc-300 hover:text-zinc-400 cursor-pointer w-10 h-10 rounded-full flex justify-center items-center font-bold mx-auto my-1 "
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Add contacts:</AlertDialogTitle>
          <AlertDialogDescription>
            Search people by their username, and add them to your contacts.
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
                {(r) => <SearchItemPreview close={()=>setOpen(false)} contact={r}/>}
              </For>
            </div>
            <Show when={searching()}>
              <div class="p-3">
                <Spinner reverse />
              </div>
            </Show>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddContact;
