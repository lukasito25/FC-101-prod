const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('dashboard.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }

  db.all('SELECT * FROM entries', [], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return;
    }

    console.log('Entries in the database:');
    console.log(rows);

    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      }
    });
  });
});
