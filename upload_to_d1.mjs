import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { pipeline } from 'stream/promises';
import csvParser from 'csv-parser';

const WORKER_BACKEND_URL = 'https://training-tracking-dashboard.hosala-lukas.workers.dev';

// Function to replace undefined values with null
function replaceUndefinedWithNull(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value === undefined ? null : value])
  );
}

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
  for (let entry of entries) {
    try {
      // Replace undefined values with null in the entry object
      entry = replaceUndefinedWithNull({
        date: entry.date,
        sessionType: entry.sessionType,
        microcycle: parseInt(entry.microcycle, 10),
        objective1: entry.objective1,
        objective2: entry.objective2,
        volume: parseInt(entry.volume, 10),
        intensity: parseInt(entry.intensity, 10),
        complexity: parseInt(entry.complexity, 10),
        exercises: [], // Exercises will be linked later
      });

      const response = await fetch(`${WORKER_BACKEND_URL}/api/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
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
  for (let exercise of exercises) {
    try {
      // Replace undefined values with null in the exercise object
      exercise = replaceUndefinedWithNull({
        entryId: parseInt(exercise.entryId, 10),
        goal: exercise.goal,
        exerciseType: exercise.exerciseType,
        focus: exercise.focus,
        description: exercise.description,
        duration: parseInt(exercise.duration, 10),
        fitnessIndicator: exercise.fitnessIndicator,
      });

      const response = await fetch(`${WORKER_BACKEND_URL}/api/exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
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


