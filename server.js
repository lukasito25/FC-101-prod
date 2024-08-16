export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { DATABASE } = env;

    // Ping endpoint to keep the server alive
    if (url.pathname === '/ping') {
      return new Response('pong', { status: 200 });
    }

    // API endpoint to get all entries along with exercises
    if (url.pathname === '/api/entries' && request.method === 'GET') {
      try {
        const entries = await DATABASE.prepare('SELECT * FROM entries').all();

        const entriesWithExercises = await Promise.all(
          entries.results.map(async (entry) => {
            const exercises = await DATABASE.prepare('SELECT * FROM exercises WHERE entryId = ?')
              .bind(entry.id)
              .all();
            return { ...entry, exercises: exercises.results };
          })
        );

        return new Response(JSON.stringify({ entries: entriesWithExercises }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // API endpoint to add a new entry along with exercises
    if (url.pathname === '/api/entries' && request.method === 'POST') {
      try {
        const { date, sessionType, microcycle, objective1, objective2, volume, intensity, complexity, exercises } = await request.json();

        const result = await DATABASE.prepare(`
          INSERT INTO entries (date, sessionType, microcycle, objective1, objective2, volume, intensity, complexity) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(date, sessionType, microcycle, objective1, objective2, volume, intensity, complexity).run();

        const entryId = result.lastInsertRowId;

        if (exercises && exercises.length > 0) {
          const insertExercise = DATABASE.prepare(`
            INSERT INTO exercises (entryId, goal, exerciseType, focus, description, duration, fitnessIndicator) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `);

          for (const exercise of exercises) {
            await insertExercise.bind(
              entryId,
              exercise.goal,
              exercise.exerciseType,
              exercise.focus,
              exercise.description,
              exercise.duration,
              exercise.fitnessIndicator
            ).run();
          }
        }

        return new Response(JSON.stringify({ id: entryId }), {
          headers: { 'Content-Type': 'application/json' },
          status: 201,
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // Return 404 for any unknown routes
    return new Response('Not Found', { status: 404 });
  }
}





















