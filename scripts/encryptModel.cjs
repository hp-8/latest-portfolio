const fs = require('fs');
const crypto = require('crypto');

async function generateAESKey(password) {
  const passwordBuffer = Buffer.from(password);
  const hashedPassword = crypto.createHash('sha256').update(passwordBuffer).digest();
  return hashedPassword.slice(0, 32);
}

async function encryptFile(inputPath, outputPath, password) {
  const key = await generateAESKey(password);
  const iv = crypto.randomBytes(16);
  
  const fileData = fs.readFileSync(inputPath);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  let encrypted = cipher.update(fileData);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  // Prepend IV to encrypted data (matches decrypt.ts format)
  const finalData = Buffer.concat([iv, encrypted]);
  fs.writeFileSync(outputPath, finalData);
  
  console.log('Model encrypted successfully!');
}

// Usage
const password = "Character3D#@"; // Make sure to use the same password in decrypt.ts
encryptFile('public/models/modifiedCharacter.glb', 'public/models/modifiedCharacter.enc', password); 