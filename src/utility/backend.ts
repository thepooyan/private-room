import PocketBase from "pocketbase"
import { post, user } from "./interface";
import { createResource } from "solid-js";
import { clearDelegatedEvents } from "solid-js/web";
const pb = new PocketBase('http://127.0.0.1:8090');
export default pb

const POSTS = pb.collection<post>('posts')

const expandUser = {
  expand: 'user',
  fields: "*,expand.user.name,expand.user.username,expand.user.avatar"
}

export const newPost = async (msg: string) => {
  const userId = pb.authStore.record?.id;
  if (!userId) throw new Error("Cannot post messages unless user is logged in!")
  return await POSTS.create({"content": msg, "user": userId});
}

const getAllPosts = () => POSTS.getFullList(expandUser)

export const getLivePostsResource = () => {
  const [signal, {mutate}] = createResource(getAllPosts)

  POSTS.subscribe("*", (e) => {
    switch (e.action) {
      case "create":
        let newPost = e.record;
        mutate(pst => pst ? [...pst, newPost] : undefined)
        break;
      case "delete":
        let wasPost = e.record;
        mutate(pst => pst ? [...pst.filter(i => i.id !== wasPost.id)] : undefined)
        break;
    }
  }, expandUser)
  return [ signal, mutate ]
}

export const removePost = async (recordId: string) => {
  return await POSTS.delete(recordId)
}

export const getAvatar = (userRecord: user | null ) => {
  if (userRecord === null) return "http://localhost:8090/default-user.jpeg"
  let url = pb.files.getURL(userRecord, userRecord.avatar) 
  return url === "" ? "http://localhost:8090/default-user.jpeg" : url
}
