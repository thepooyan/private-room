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
  const limitSize = (str: string) => {
    let limit = 20
    if (str.length > limit)
      return str.substring(0, limit).concat("...")
    return str
  }
   return (
    <div class="cursor-pointer inline" onclick={click}>
      {children ? children : limitSize(toCopy)}
    </div>
  )
}

export default Copyable
