const { Client } = require('pg');
const fs = require('fs');

// Read DATABASE_URL from .env
const envContent = fs.readFileSync('.env', 'utf8');
const connectionString = envContent
  .split('\n')
  .find(line => line.startsWith('DATABASE_URL'))
  .split('=')[1]
  .replace(/"/g, '');

console.log('Connecting to database...');
const client = new Client({ connectionString });

client.connect().then(() => {
  console.log('Connected!');
  return client.query('SELECT id, email, role, "firstName", "lastName" FROM users WHERE email = $1', ['doctor@example.com']);
}).then(res => {
  if (res.rows.length > 0) {
    console.log('User found:', res.rows[0]);
  } else {
    console.log('User not found');
  }
  return client.end();
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
