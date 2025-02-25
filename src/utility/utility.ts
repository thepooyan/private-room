import { Iuser } from "./interface";

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
    localStorage.setItem(this.key, JSON.stringify(Array.from(this.data)))
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

export const contanctStorage = new arrayStorage<Iuser>("contacts")

export async function copyToClipboard(text: string): Promise<void> {
    if (!navigator.clipboard) {
        // Fallback for browsers that do not support the Clipboard API
        fallbackCopyTextToClipboard(text);
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy text to clipboard:', err);
        // Fallback in case of error
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Fallback: Text copied to clipboard successfully!');
        } else {
            console.error('Fallback: Failed to copy text to clipboard.');
        }
    } catch (err) {
        console.error('Fallback: Error copying text to clipboard:', err);
    }
    
    document.body.removeChild(textArea);
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
      if (timeoutId) {
          clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
          func(...args);
      }, delay);
  };
}
type func = () => void
export class CallbackStore {
  private yes: func | null = null
  private no: func | null = null
  setYes(callback: ()=>void) {
    this.yes = callback
  }
  setNo(callback: ()=>void) {
    this.no = callback
  }
  callYes() {
    this.yes && this.yes()
    this.clear()
  }
  callNo() {
    this.no && this.no()
    this.clear()
  }
  private clear() {
    this.yes = null
    this.no = null
  }
}
