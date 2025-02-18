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

export async function exportCryptoKey(cryptoKey: CryptoKey): Promise<JsonWebKey> {
  return crypto.subtle.exportKey("jwk", cryptoKey);
}
export async function importCryptoKey(jwkString: string): Promise<CryptoKey> {
  try {
    const jwk = JSON.parse(jwkString);

    if (jwk.kty !== "RSA") {
      throw new Error("Key type must be RSA for RSA-OAEP.");
    }

    const algorithm = {
      name: "RSA-OAEP",
      hash: "SHA-256", // Or other hash algorithm like "SHA-1", "SHA-512"
    };

    // Determine key usages.  Default to encrypt/decrypt if not specified.
    let keyUsages: KeyUsage[] = [];
    if (jwk.use === "enc") {
      keyUsages = ["encrypt", "decrypt"];
    } else if (jwk.key_ops && jwk.key_ops.length > 0) {
      keyUsages = jwk.key_ops as KeyUsage[];
    } else {
      keyUsages = ["encrypt", "decrypt"]; // Default for RSA-OAEP
    }

    const cryptoKey = await crypto.subtle.importKey(
      "jwk",
      jwk,
      algorithm,
      true, // extractable
      keyUsages
    );

    return cryptoKey;
  } catch (error) {
    console.error("Error importing RSA-OAEP JWK:", error);
    throw new Error(`Failed to import RSA-OAEP JWK: ${error}`);
  }
}
