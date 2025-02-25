import { createSignal, For, Show } from "solid-js"
import SearchItemPreview from "~/components/chat/SearchItemPreview"
import Spinner from "~/components/mine/Spinner"
import { TextField, TextFieldInput } from "~/components/ui/text-field"
import { api } from "~/utility/backend"
import { Iuser } from "~/utility/interface"
import { debounce } from "~/utility/utility"

const Test = () => {

  const [result, setResult] = createSignal<Iuser[]>([]);
  const [searching, setSearching] = createSignal(false)

  const searchRequest = async (str: string) => {
    let a = await api.users.searchByUsername(str)
    setResult(a.items)
    setSearching(false)
  }

  const d_searchReq = debounce(searchRequest, 500)

  const onKeyUp = async (str: string) => {
    if (str === "") return setResult([])
    setSearching(true)
    d_searchReq(str)
  }

  return (
    <div class="w-1/2 m-4 space-y-2">
      <p>
        Search people:
      </p>
      <TextField>
        <TextFieldInput placeholder="Search by username..." oninput={e => onKeyUp(e.currentTarget.value)}/>
      </TextField>
      <For each={result()}>
        {r => <SearchItemPreview contact={r}/>}
      </For>
      <Show when={searching()}>
        <div class="p-3">
          <Spinner/>
        </div>
      </Show>
    </div>
  )
}

export default Test
