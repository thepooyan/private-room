class IndexedDBHelper<T> {
  private dbName: string;
  private storeName: string;
  private dbVersion: number;
  private db: IDBDatabase | null = null;

  constructor(dbName: string, storeName: string, dbVersion: number = 1) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.dbVersion = dbVersion;
    this.openDatabase();
  }

  private openDatabase(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = (event: Event) => {
      console.error(
        "Error opening database:",
        (event.target as IDBOpenDBRequest).error,
      );
    };
  }

  public add(item: T): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database not initialized");
      }

      const transaction = this.db.transaction(this.storeName, "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.add(item);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  public get(id: string | number): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database not initialized");
      }

      const transaction = this.db.transaction(this.storeName, "readonly");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(id);

      request.onsuccess = (event) =>
        resolve((event.target as IDBRequest).result);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  public update(item: T): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database not initialized");
      }

      const transaction = this.db.transaction(this.storeName, "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.put(item);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  public delete(id: string | number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database not initialized");
      }

      const transaction = this.db.transaction(this.storeName, "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }
}
