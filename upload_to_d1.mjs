import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { pipeline } from 'stream/promises';
import csvParser from 'csv-parser';

const WORKER_BACKEND_URL = 'https://training-tracking-dashboard.hosala-lukas.workers.dev';

const insertEntries = async () => {
  const entries = [];
  const exercises = [];

  // Read and parse entries.csv
  await pipeline(
    fs.createReadStream(path.join(process.cwd(), 'entries.csv')),
    csvParser(),
    async function* (source) {
      for await (const row of source) {
        entries.push(row);
      }
    }
  );

  console.log('Finished reading entries.csv');
  for (const entry of entries) {
    try {
      const response = await fetch(`${WORKER_BACKEND_URL}/api/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: entry.date,
          sessionType: entry.sessionType,
          microcycle: parseInt(entry.microcycle, 10),
          objective1: entry.objective1,
          objective2: entry.objective2,
          volume: parseInt(entry.volume, 10),
          intensity: parseInt(entry.intensity, 10),
          complexity: parseInt(entry.complexity, 10),
          exercises: [], // Exercises will be linked later
        }),
      });

      const text = await response.text(); // Read the response as text first

      // Check if response is JSON
      try {
        const result = JSON.parse(text);
        console.log('Entry inserted:', result);
      } catch (err) {
        console.error('Error inserting entry:', text); // Log the actual response
      }

    } catch (error) {
      console.error('Error inserting entry:', error);
    }
  }

  // Read and parse exercises.csv
  await pipeline(
    fs.createReadStream(path.join(process.cwd(), 'exercises.csv')),
    csvParser(),
    async function* (source) {
      for await (const row of source) {
        exercises.push(row);
      }
    }
  );

  console.log('Finished reading exercises.csv');
  for (const exercise of exercises) {
    try {
      const response = await fetch(`${WORKER_BACKEND_URL}/api/exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entryId: parseInt(exercise.entryId, 10),
          goal: exercise.goal,
          exerciseType: exercise.exerciseType,
          focus: exercise.focus,
          description: exercise.description,
          duration: parseInt(exercise.duration, 10),
          fitnessIndicator: exercise.fitnessIndicator,
        }),
      });

      const text = await response.text(); // Read the response as text first

      // Check if response is JSON
      try {
        const result = JSON.parse(text);
        console.log('Exercise inserted:', result);
      } catch (err) {
        console.error('Error inserting exercise:', text); // Log the actual response
      }

    } catch (error) {
      console.error('Error inserting exercise:', error);
    }
  }
};

insertEntries();

