import { removePost } from "../utility/backend"
import { post } from "../utility/interface"
import { isMyPost } from "../utility/util"

interface props {
  post: post
}
const Post = ({post}:props) => {

  const removeMe = () => {
    removePost(post.id)
  }

  return (
    <div class={` w-[90%] mb-2 p-1 rounded ${isMyPost(post) ? "bg-blue-400 ml-auto" : "bg-green-300"} `}>
      {post.content}
      <span class="text-gray-700 text-xs ml-2">
        ({post.expand?.user.username})
      </span>
      {isMyPost(post) && <button class="text-xs text-red-500 ml-2" onclick={removeMe}>remove</button>}
    </div>
  )
}

export default Post
