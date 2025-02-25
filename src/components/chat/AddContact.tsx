import { AiFillPlusCircle } from "solid-icons/ai";
import { Iuser } from "~/utility/interface";
import { contanctStorage } from "~/utility/utility";
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

const AddContact = () => {
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
      public_key: trg.public_key as JsonWebKey,
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
          <AlertDialogTitle>Add Contact:</AlertDialogTitle>
          <AlertDialogDescription>
            <TextField>
              <TextFieldInput/>
            </TextField>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddContact;
