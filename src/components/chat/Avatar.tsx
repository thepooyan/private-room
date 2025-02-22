import { Accessor, Suspense } from "solid-js"
import { avatarQuery } from "~/utility/queries"

interface props {
  username: Accessor<string>
}
const Avatar = ({username}:props) => {

  let avatar = avatarQuery(username)

  return (
    <>
      {username() === "" ? <Blank/> :

      <Suspense fallback={<Fallback/>}>
        <div innerHTML={avatar.data} class="w-15 bg-gray rounded-full overflow-hidden" ></div>
      </Suspense>}
    </>
  )
}

const Fallback = () => {
  return <div class="w-15 h-15 bg-gray rounded-full flex justify-center items-center" >
    <div class="w-5 h-5 rounded-full border-2 border-white border-t-gray-300 border-b-gray-300 animate-spin"></div>
  </div>
}

const Blank = () => {
  return <div class="w-15 h-15 bg-gray rounded-full flex justify-center items-center"></div>
}

export default Avatar
