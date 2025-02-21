import clsx from "clsx"
import { ParentProps } from "solid-js"

interface props extends ParentProps {
  isRightSide?: boolean
  isTemp?: boolean
}
const Msg = ({isRightSide = false, children, isTemp = false}:props) => {
  return (
    <div class={clsx(
      "bg-teal-200 w-max p-2 mb-4 rounded ",
      isRightSide && "!bg-indigo-400 ml-auto ",
      isTemp && "opacity-40"
    )}>
      {children}
    </div>
  )
}

export default Msg
