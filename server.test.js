const request = require('supertest');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

let db;

beforeAll(() => {
  db = new sqlite3.Database(':memory:');
  db.serialize(() => {
    db.run('CREATE TABLE entries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, team TEXT)');
  });

  app.post('/api/entries', (req, res) => {
    const { name, date, team } = req.body;
    db.run('INSERT INTO entries (name, date, team) VALUES (?, ?, ?)', [name, date, team], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
  });

  app.get('/api/entries', (req, res) => {
    db.all('SELECT * FROM entries', [], (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ entries: rows });
    });
  });
});

afterAll(() => {
  db.close();
});

describe('Test the /api/entries endpoint', () => {
  it('should add a new entry and return it', async () => {
    const newEntry = { name: 'Test User', date: '2023-08-13', team: 'Team A' };

    const postResponse = await request(app)
      .post('/api/entries')
      .send(newEntry)
      .expect(200);

    expect(postResponse.body).toHaveProperty('id');

    const getResponse = await request(app)
      .get('/api/entries')
      .expect(200);

    expect(getResponse.body.entries).toHaveLength(1);
    expect(getResponse.body.entries[0]).toMatchObject(newEntry);
  });
});

