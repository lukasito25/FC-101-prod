const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dashboard.db');

db.serialize(() => {
  // Create entries table
  db.run('CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, team TEXT)');
  
  console.log('Database initialized');
});

db.close();

