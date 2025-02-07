export async function generateRSAKeyPair(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"],
  );
}

export async function encryptMessage(
  publicKey: CryptoKey,
  message: string,
): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(message);

  return crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encodedMessage,
  );
}

export async function decryptMessage(
  privateKey: CryptoKey,
  encryptedMessage: ArrayBuffer,
): Promise<string> {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encryptedMessage,
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function checkKeysMatch(
  publicKey: CryptoKey,
  privateKey: CryptoKey,
): Promise<boolean> {
  const testMessage = "Test message to verify keys";
  const encryptedMessage = await encryptMessage(publicKey, testMessage);
  const decryptedMessage = await decryptMessage(privateKey, encryptedMessage);

  return decryptedMessage === testMessage;
}

export async function exportCryptoKey(
  cryptoKey: CryptoKey,
): Promise<ArrayBuffer> {
  return crypto.subtle.exportKey("spki", cryptoKey);
}
export async function importCryptoKey(base64Key: string): Promise<CryptoKey> {
  const keyData = base64ToArrayBuffer(base64Key);

  const importedKey = await crypto.subtle.importKey(
    "spki",
    keyData,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"],
  );

  return importedKey;
}
