const crypto = require('crypto');

// 生成一个32字节的随机字符串作为NEXTAUTH_SECRET
const secret = crypto.randomBytes(16).toString('hex');
console.log('NEXTAUTH_SECRET:', secret);