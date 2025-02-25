import { ParentProps } from "solid-js"
import { copyToClipboard } from "~/utility/utility"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { AiFillCheckCircle } from "solid-icons/ai"

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
    <Popover>
      <PopoverTrigger>
        <div class="cursor-pointer inline select-none" onclick={click}>
          {children ? children : limitSize(toCopy)}
        </div>
      </PopoverTrigger>
      <PopoverContent class="bg-green-500">
        <AiFillCheckCircle class="inline mr-2 !w-max"/>
        Copied!
      </PopoverContent>
    </Popover>
  )
}

export default Copyable
