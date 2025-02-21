import { createMutation, createQuery, QueryClientConfig } from "@tanstack/solid-query"
import { Icontact } from "./interface"
import { api } from "./backend"
import { qc } from "~/app"

export const queryConfig:QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5, // 5 min
      staleTime: Infinity,
    }
  }
}

export const fetchAvatar = async (key: string) => {
  let res = await fetch(`https://api.dicebear.com/9.x/pixel-art/svg?seed=${key}`)
  return await res.text()
}

export const avatarQuery = (key: string) => {
  return createQuery(() => ({
    queryKey: ["avatar", key],
    queryFn: () => fetchAvatar(key),
  }))
}

export const messagesMutation = (to: Icontact) => {
  return createMutation(() => ({
    mutationFn: (msg: string) => api.messages.send(to, msg),
    onSuccess: () => {
      qc.invalidateQueries({queryKey: ["msgs", to.id]})
    }
  }), () => qc)
}
