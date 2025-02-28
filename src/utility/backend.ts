import PocketBase, { ListResult } from "pocketbase"
import { IlocalUser, Imessage, Iuser } from "./interface";
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
    },
    findContacts: async (user: IlocalUser) => {
      let res = await pb_msg.getFullList<{expand:{reciever:Iuser}}>({
        filter: `sender = "${user.id}"`,
        fields: "expand.reciever.username, expand.reciever.public_key,expand.reciever.id",
        expand: "reciever"
      })
      let uniqe = new Set<string>()
      let contacts:Iuser[] = []
      res.forEach(i => {
        if (uniqe.has(i.expand.reciever.id)) return
        uniqe.add(i.expand.reciever.id)
        contacts.push({
          id: i.expand.reciever.id,
          username: i.expand.reciever.username,
          public_key: i.expand.reciever.public_key
        })
      })
      return contacts
    },
    searchByUsername: (username: string) => {
      return pb_users.getList(1, 20, {filter: `username ~ "${username}"`})
    },
    deleteAccount: () => {
      let u = user.signal()
      if (!u) throw new Error("Not logged in!")
      return pb_users.delete(u.id)
    }
  },
  messages: {
    send: (to: Iuser, content: string) => {
      let sig = user.signal()
      if (!sig) throw new Error("User not logged in")
      let me = sig.id
      return pb_msg.create({
        sender: me,
        reciever: to.id,
        content: content
      })
    },
    getAll: (c: Iuser) => {
      let sig = user.signal()
      if (!sig) throw new Error("User not logged in")
      let me = sig.id
      let him = c.id
      return pb_msg.getList(1, 50, {filter: `(sender = "${me}" && reciever = "${him}") || (sender = "${him}" && reciever = "${me}")`})
    },
    getAllReactive: (c: Accessor<Iuser>) => {
      const signal = messageQuery(c)
      return { signal }
    }, 
    subscribeUser: (user: IlocalUser) => {
      return pb_msg.subscribe("*", e => {
        switch(e.action) {
          case "create":
            qc.setQueryData(["msgs", e.record.sender], (oldldata: ListResult<Imessage> | null) => {
              return oldldata?.items ? {...oldldata, items: [...oldldata.items, e.record] } : null
            })
          break
          case "delete":
          break
        }
      }, {filter: `reciever = "${user.id}"`})
    },
    unsubscribeToAll: () => {
      return pb_msg.unsubscribe("")
    }
  }
}

export const messageQuery = (contact: Accessor<Iuser>) => {
  return createQuery(() => ({
    queryKey: ["msgs", contact().id],
    queryFn: () => api.messages.getAll(contact()),
    staleTime: 2000
  }))
}
