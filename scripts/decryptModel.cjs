const fs = require('fs').promises;
const { webcrypto } = require('crypto');
const { join } = require('path');
// Use Node's crypto implementation since we're not in a browser
const crypto = webcrypto;

async function generateAESKey(password) {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

async function decryptFile(encryptedData, password) {
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
}

async function main() {
  try {
    // Read the encrypted file
    const encryptedData = await fs.readFile(join(process.cwd(), 'public/models/character.enc'));
    
    // Decrypt the file
    const decryptedData = await decryptFile(encryptedData.buffer, 'Character3D#@');
    
    // Create output directory if it doesn't exist
    const outputDir = join(process.cwd(), 'decrypted_models');
    await fs.mkdir(outputDir, { recursive: true });
    
    // Save the decrypted file
    await fs.writeFile(
      join(outputDir, 'character.glb'),
      Buffer.from(decryptedData)
    );
    
    console.log('Model successfully decrypted and saved to decrypted_models/character.glb');
  } catch (error) {
    console.error('Failed to decrypt model:', error);
  }
}

main(); 