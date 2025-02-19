import PocketBase from "pocketbase"
import { Icontact, Imessage, Iuser } from "./interface";
import { createResource } from "solid-js";

const pb = new PocketBase('http://127.0.0.1:8090')

const pb_users = pb.collection<Iuser>("users")
const pb_msg = pb.collection<Imessage>("messages")

export const api = {
  users: {
    findByPK: (pk: string) => {
      return pb_users.getFirstListItem(`public_key='${pk}'`)
    },
    findByUsername: (username: string) => {
      return pb_users.getFirstListItem(`username = "${username}"`)
    },
    new: (username: string, publicKey: string) => {
      return pb_users.create({username: username, public_key: publicKey})
    }
  },
  messages: {
    getAll: (c: Icontact) => {
      return pb_msg.getList(1, 50, {filter: `(sender = "474810qviokp647" && reciever = "633b98x9d17wi44") || (sender = "633b98x9d17wi44" && reciever = "474810qviokp647")`})
    },
    getLiveResource: (c: Icontact) => {
      const [signal, {mutate}] = createResource(() => api.messages.getAll(c))

      return [signal,mutate]
    }
  }
}
