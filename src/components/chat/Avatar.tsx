import { createQuery } from "@tanstack/solid-query"
import clsx from "clsx"
import { Accessor, Suspense } from "solid-js"

interface props {
  username?: string
  reactive?: Accessor<string>
  sm?: boolean
}
const Avatar = ({username, reactive, sm}:props) => {
  let key = () => {
    if (username) return username
    if (reactive) return reactive()
    throw new Error("at least provide one of 'reactive' or 'username'.")
  }

  let avatar = avatarQuery(key)

  return (
    <div class={clsx(
      sm && "w-11 h-11",
      !sm && "w-15 h-15"
    )}>
      <Suspense fallback={<Fallback/>}>
        <div innerHTML={avatar.data} class="bg-zinc rounded-full overflow-hidden" ></div>
      </Suspense>
    </div>
  )
}

const fetchAvatar = async (key: string) => {
  let res = await fetch(`https://api.dicebear.com/9.x/pixel-art/svg?seed=${key}`)
  return await res.text()
}

const avatarQuery = (key: Accessor<string>) => {
  return createQuery(() => ({
    queryKey: ["avatar", key()],
    queryFn: () => fetchAvatar(key()),
  }))
}


const Fallback = () => {
  return <div class="bg-zinc rounded-full flex justify-center items-center" >
    <div class="w-5 h-5 rounded-full border-2 border-white border-t-zinc-300 border-b-zinc-300 animate-spin"></div>
  </div>
}

const Blank = () => {
  return <div class="w-15 h-15 bg-zinc rounded-full flex justify-center items-center"></div>
}

export default Avatar
