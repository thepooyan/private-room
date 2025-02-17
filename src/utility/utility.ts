import { contact } from "./interface";

export class storage<T extends object> {
  private key: string
  constructor(key: string) {
    this.key = key
  }
  get() {
    let d = localStorage.getItem(this.key);
    if (d === null) return null;
    return JSON.parse(d) as T;
  }
  save(object: T) {
    localStorage.setItem(this.key, JSON.stringify(object));
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}

export const contanctStorage = new storage<contact[]>("contacts")
