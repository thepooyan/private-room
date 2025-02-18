import clsx from "clsx"

interface props {
  isRightSide?: boolean
}
const Msg = ({isRightSide = false}:props) => {
  return (
    <div class={clsx(
      "bg-teal-200 w-max p-2 mb-4 rounded ",
      isRightSide && "!bg-indigo-400 ml-auto ",
    )}>
      Hi this is Msg!
    </div>
  )
}

export default Msg
