import { createMutation, createQuery, QueryClientConfig } from "@tanstack/solid-query"
import { Icontact } from "./interface"
import { api } from "./backend"
import { qc } from "~/app"
import { Accessor } from "solid-js"

export const queryConfig:QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5, // 5 min
      staleTime: Infinity,
    }
  }
}

export const messagesMutation = (to: Accessor<Icontact>) => {
  return createMutation(() => ({
    mutationFn: (msg: string) => api.messages.send(to(), msg),
    onSettled: () => {
      qc.invalidateQueries({queryKey: ["msgs", to().id]})
    },
    mutationKey: ["mutateMsgs", to().id]
  }), () => qc)
}
