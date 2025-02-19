import clsx from "clsx"
import { ParentProps } from "solid-js"

interface props extends ParentProps {
  isRightSide?: boolean
}
const Msg = ({isRightSide = false, children}:props) => {
  return (
    <div class={clsx(
      "bg-teal-200 w-max p-2 mb-4 rounded ",
      isRightSide && "!bg-indigo-400 ml-auto ",
    )}>
      {children}
    </div>
  )
}

export default Msg
