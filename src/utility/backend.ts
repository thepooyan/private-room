import PocketBase, { ListResult } from "pocketbase"
import { Icontact, Imessage, Iuser } from "./interface";
import { Accessor, } from "solid-js";
import { user } from "./signal";
import { createQuery  } from "@tanstack/solid-query";
import { qc } from "~/app";

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
    getLiveResource: (c: Accessor<Icontact>) => {
      const signal = messageQuery(c)
      pb_msg.unsubscribe("*")
      pb_msg.subscribe("*", e => {
        switch(e.action) {
          case "create":
            let sig = user.signal()
            if (!sig) throw new Error("User not logged in")
            if (e.record.sender !== c().id || e.record.reciever !== sig.id) return
            qc.setQueryData(["msgs", c().id], (oldldata: ListResult<Imessage>) => {
              return {...oldldata, items: [...oldldata.items, e.record] }
            })
            e.record
          break
          case "delete":
          break
        }
      })
      return { signal }
    }
  }
}

export const messageQuery = (contact: Accessor<Icontact>) => {
  return createQuery(() => ({
    queryKey: ["msgs", contact().id],
    queryFn: () => api.messages.getAll(contact()),
    staleTime: 2000
  }))
}
