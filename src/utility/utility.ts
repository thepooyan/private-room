import { contact } from "./interface";

export class objectStorage<T extends object> {
  private key: string
  constructor(key: string) {
    this.key = key
  }
  get() {
    let d = localStorage.getItem(this.key);
    if (d === null) return null;
    return JSON.parse(d) as T;
  }
  save(object: T | ((prev: T | null) => T)) {
    if (typeof object === "function") {
      object = object(this.get())
    }
    localStorage.setItem(this.key, JSON.stringify(object));
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}

export class arrayStorage<T extends object> {
  private key: string
  private data: Set<T> = new Set()
  constructor(key: string) {
    this.key = key
    this.data = this.loadData()
  }
  loadData():Set<T> {
    let s = localStorage.getItem(this.key)
    return new Set(s ? JSON.parse(s) : [])
  }
  saveData() {
    localStorage.setItem(this.key, JSON.stringify(this.data))
  }
  add(item: T) {
    this.data.add(item)
    this.saveData()
  }
  remove(item: T) {
    this.data.delete(item)
    this.saveData()
  }
  clear() {
    this.data = new Set()
    this.saveData()
  }
  getAll():Set<T> {
    return new Set(this.data)
  }
}

export const contanctStorage = new arrayStorage<contact>("contacts")
