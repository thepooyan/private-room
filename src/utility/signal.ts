import { createSignal } from "solid-js";
import pb from "./backend";
import { user } from "./interface";

class UserManager {
  private isLoggedInSignal;
  private isLoadingSignal;

  constructor() {
    this.isLoggedInSignal = createSignal(pb.authStore.isValid);
    this.isLoadingSignal = createSignal(false);
  }
  async Login() {
    this.isLoadingSignal[1](true)
    await pb.collection('users').authWithOAuth2({ provider: 'google' });
    this.isLoadingSignal[1](false)
    this.isLoggedInSignal[1](true)
  }
  Logout() {
    pb.authStore.clear()
    this.isLoggedInSignal[1](false)
  }
  getUser() {
    if (!this.isLoggedInSignal[0]()) return null
    return pb.authStore.record as user
  }
  isLoggedIn() {
    return this.isLoggedInSignal[0]()
  }
  isLoading() {
    return this.isLoadingSignal[0]()
  }
}

export const userManager = new UserManager()
