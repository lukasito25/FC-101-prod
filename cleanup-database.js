import fetch from 'node-fetch';

const WORKER_BACKEND_URL = 'https://training-tracking-dashboard.hosala-lukas.workers.dev';

const cleanupDatabase = async () => {
  try {
    // First, delete all exercises
    let response = await fetch(`${WORKER_BACKEND_URL}/api/exercises`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('All exercises deleted successfully.');
    } else {
      console.error('Failed to delete exercises:', await response.text());
    }

    // Then, delete all entries
    response = await fetch(`${WORKER_BACKEND_URL}/api/entries`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('All entries deleted successfully.');
    } else {
      console.error('Failed to delete entries:', await response.text());
    }

  } catch (error) {
    console.error('Error during database cleanup:', error);
  }
};

cleanupDatabase();

