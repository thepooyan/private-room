import { AiFillPlusCircle } from 'solid-icons/ai'
import { Iuser } from "~/utility/interface"
import { contanctStorage } from "~/utility/utility"
import { reloadContacts } from "./contactList"
import { api } from '~/utility/backend'

const AddContact = () => {
  const add = async () => {
    let pk = prompt("Public key of the guy:")
    let trg: Iuser;
    if (!pk) return 

    try {
     trg = await api.users.findByPK(pk)
    } catch(e) {
      return alert("User not found!")
    }

    contanctStorage.add({username: trg.username, public_key: trg.public_key as JsonWebKey})
    reloadContacts()
  }
  return (
    <>
      <AiFillPlusCircle
        class="text-gray-400 hover:text-gray-500 cursor-pointer w-5 h-5 rounded-full flex justify-center items-center font-bold mx-auto my-2 "
        onclick={add}
      />
    </>
  )
}

export default AddContact
