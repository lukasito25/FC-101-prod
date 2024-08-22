-- Clean up existing data
DELETE FROM exercises;
DELETE FROM entries;

-- Create the 'entries' table
CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY,  -- Using UUID for the primary key
    date TEXT NOT NULL,
    sessionType TEXT NOT NULL,
    microcycle INTEGER NOT NULL,
    objective1 TEXT,
    objective2 TEXT,
    volume INTEGER NOT NULL,
    intensity INTEGER NOT NULL,
    complexity INTEGER
);

-- Create the 'exercises' table
CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY,  -- Using UUID for the primary key
    entryId TEXT NOT NULL,  -- Also a UUID, referencing the entries table
    goal TEXT NOT NULL,
    exerciseType TEXT NOT NULL,
    focus TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    fitnessIndicator TEXT,
    FOREIGN KEY (entryId) REFERENCES entries(id) ON DELETE CASCADE
);

-- Insert dummy data into 'entries' with UUIDs
INSERT INTO entries (id, date, sessionType, microcycle, objective1, objective2, volume, intensity, complexity)
VALUES 
(uuid(), '2024-08-14', 'Training', 1, 'Increase endurance', 'Improve speed', 90, 80, 3),
(uuid(), '2024-08-15', 'Recovery', 2, 'Muscle recovery', 'Flexibility improvement', 60, 50, 2),
(uuid(), '2024-08-16', 'Match', 3, 'Tactical play', 'Team coordination', 120, 90, 4);

-- Insert corresponding dummy data into 'exercises' with UUIDs and correct entryId references
INSERT INTO exercises (id, entryId, goal, exerciseType, focus, description, duration, fitnessIndicator)
VALUES 
(uuid(), (SELECT id FROM entries WHERE date = '2024-08-14' LIMIT 1), 'HT', 'PC', 'HCJ', 'Warm-up drill', 15, 'R'),
(uuid(), (SELECT id FROM entries WHERE date = '2024-08-14' LIMIT 1), 'HN', 'HC', 'HK', 'Main drill', 60, 'S'),
(uuid(), (SELECT id FROM entries WHERE date = '2024-08-15' LIMIT 1), 'RC', 'PH', 'HS', 'Stretching and cool down', 30, 'Koo'),
(uuid(), (SELECT id FROM entries WHERE date = '2024-08-15' LIMIT 1), 'NP', 'VH', 'SHS', 'Hydration and rest', 30, 'V'),
(uuid(), (SELECT id FROM entries WHERE date = '2024-08-16' LIMIT 1), 'KT', 'PC', 'HS', 'Opening strategy', 20, 'S'),
(uuid(), (SELECT id FROM entries WHERE date = '2024-08-16' LIMIT 1), 'RC', 'HC', 'HK', 'Mid-game strategy', 50, 'R'),
(uuid(), (SELECT id FROM entries WHERE date = '2024-08-16' LIMIT 1), 'NP', 'VH', 'HCJ', 'End-game tactics', 50, 'Koo');


