import { A as AA, AnchorProps } from "@solidjs/router"
import { STYLES } from "~/styles/style"

const A = (props:AnchorProps) => {
  return (
    <AA {...props} class={`${STYLES.link} ${props.class || ""}`} />
  )
}

export default A
