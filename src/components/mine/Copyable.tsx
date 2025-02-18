import { ParentProps } from "solid-js"
import { copyToClipboard } from "~/utility/utility"

interface props extends ParentProps {
  toCopy: string
}
const Copyable = ({children, toCopy}:props) => {
  const click = () => {
    copyToClipboard(toCopy)
    .catch(e => alert(e))
  }
  return (
    <div class="cursor-pointer" onclick={click}>
      {children}
    </div>
  )
}

export default Copyable
