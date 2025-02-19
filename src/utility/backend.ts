import PocketBase from "pocketbase"
import { Icontact, Imessage, Iuser } from "./interface";
import { createResource } from "solid-js";
import { user } from "./signal";

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
    send: (to: Icontact, content: string) => {
      let sig = user.signal()
      if (!sig) throw new Error("User not logged in")
      let me = sig.id
      return pb_msg.create({
        sender: me,
        reciever: to.id,
        content: content
      })
    },
    getAll: (c: Icontact) => {
      let sig = user.signal()
      if (!sig) throw new Error("User not logged in")
      let me = sig.id
      let him = c.id
      return pb_msg.getList(1, 50, {filter: `(sender = "${me}" && reciever = "${him}") || (sender = "${him}" && reciever = "${me}")`})
    },
    getLiveResource: (c: Icontact) => {
      const [signal, {mutate}] = createResource(() => api.messages.getAll(c))

      pb_msg.subscribe("*", (e) => {
        switch (e.action) {
          case "create":
            let newMsg = e.record;
            mutate(prev => prev ? {...prev, items: [...prev.items, newMsg]} : undefined)
            break;
          case "delete":
            // let wasPost = e.record;
            // mutate(pst => pst ? [...pst.filter(i => i.id !== wasPost.id)] : undefined)
            // break;
        }
      })

      return [signal,mutate]
    }
  }
}
