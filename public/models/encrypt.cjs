const fs = require('fs');
const crypto = require('crypto').webcrypto;
const path = require('path');

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

async function encryptFile(fileData, password) {
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const key = await generateAESKey(password);
  
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    fileData
  );

  const result = new Uint8Array(iv.length + encryptedData.byteLength);
  result.set(iv, 0);
  result.set(new Uint8Array(encryptedData), iv.length);
  
  return result.buffer;
}

async function main() {
  try {
    // Read from decrypted_models folder
    const inputPath = path.join(process.cwd(), 'decrypted_models', 'character.glb');
    console.log('Reading from:', inputPath);

    const fileData = await fs.promises.readFile(inputPath);
    console.log('File read successfully, encrypting...');

    const encryptedData = await encryptFile(fileData.buffer, 'Character3D#@');
    
    // Save to public/models
    const outputPath = path.join(process.cwd(), 'public', 'models', 'character.enc');
    await fs.promises.writeFile(outputPath, Buffer.from(encryptedData));
    
    console.log('Successfully encrypted and saved to:', outputPath);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
