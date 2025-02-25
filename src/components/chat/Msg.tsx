import clsx from "clsx"
import { ParentProps } from "solid-js"

interface props extends ParentProps {
  isRightSide?: boolean
  isTemp?: boolean
}
const Msg = ({isRightSide = false, children, isTemp = false}:props) => {
  return (
    <div class={clsx(
      " bg-zinc-800 w-max p-2 px-3 mb-4 rounded-xl text-sm ",
      isRightSide && "!bg-white ml-auto text-black ",
      isTemp && "opacity-40"
    )}>
      {children}
    </div>
  )
}

export default Msg
