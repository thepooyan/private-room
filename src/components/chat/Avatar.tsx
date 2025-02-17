import { avatarQuery } from "~/utility/queries"

interface props {
  username: string
}
const Avatar = ({username}:props) => {
  let avatar = avatarQuery(username)
  return (
    <div innerHTML={avatar.data} class="w-15 bg-gray rounded-full overflow-hidden" ></div>
  )
}

export default Avatar
