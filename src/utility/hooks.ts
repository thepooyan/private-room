import { useNavigate } from "@solidjs/router";
import { user } from "./signal";
import { createEffect } from "solid-js";
import { api } from "./backend";
import { callModal } from "~/components/modal/Modal";
import { deleteAccount } from "./logic";

export const useNeedsUser = (returnTo: string = "/Login") => {
  const navigate = useNavigate();
  if (user.signal() === null) navigate(returnTo);
  createEffect(() => {
    if (user.signal() === null) navigate(returnTo);
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  return () => {
    navigate("/Login");
    user.logout();
  };
};

export const useDeleteAccount = () => {
  const logout = useLogout();

  return () => {
    let us = user.signal()
    if (us)
    deleteAccount(us.public_key, us.private_key)
    .then(logout)
    .catch(e => {
      console.log(e)
      callModal.fail("Something went wrong. Please try again.")
    })
  };
};
