import { useNavigate } from "@solidjs/router";
import { user } from "./signal";
import { createEffect } from "solid-js";
import { api } from "./backend";
import { callModal } from "~/components/modal/Modal";

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
    api.users
      .deleteAccount()
      .then(logout)
      .catch((e) => {
        console.log(e);
        callModal.fail("Failed to delete your account. Please try again later.");
      });
  };
};
