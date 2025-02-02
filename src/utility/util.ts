import pb from "./backend"
import { post } from "./interface"
import { userManager } from "./signal"


export const isMyPost = (post: post) => {
  userManager.isLoggedIn()
  return pb.authStore.record?.username === post.expand?.user.username
}
