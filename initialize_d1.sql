
-- Clean up existing data
DELETE FROM exercises;
DELETE FROM entries;

-- Create the 'entries' table
CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entryId INTEGER NOT NULL,
    goal TEXT NOT NULL,
    exerciseType TEXT NOT NULL,
    focus TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    fitnessIndicator TEXT,
    FOREIGN KEY (entryId) REFERENCES entries(id) ON DELETE CASCADE
);

-- Insert dummy data into 'entries'
INSERT INTO entries (date, sessionType, microcycle, objective1, objective2, volume, intensity, complexity)
VALUES 
('2024-08-14', 'Training', 1, 'Increase endurance', 'Improve speed', 90, 80, 3),
('2024-08-15', 'Recovery', 2, 'Muscle recovery', 'Flexibility improvement', 60, 50, 2),
('2024-08-16', 'Match', 3, 'Tactical play', 'Team coordination', 120, 90, 4);

-- Insert corresponding dummy data into 'exercises'
INSERT INTO exercises (entryId, goal, exerciseType, focus, description, duration, fitnessIndicator)
VALUES 
(1, 'HT', 'PC', 'HCJ', 'Warm-up drill', 15, 'R'),
(1, 'HN', 'HC', 'HK', 'Main drill', 60, 'S'),
(2, 'RC', 'PH', 'HS', 'Stretching and cool down', 30, 'Koo'),
(2, 'NP', 'VH', 'SHS', 'Hydration and rest', 30, 'V'),
(3, 'KT', 'PC', 'HS', 'Opening strategy', 20, 'S'),
(3, 'RC', 'HC', 'HK', 'Mid-game strategy', 50, 'R'),
(3, 'NP', 'VH', 'HCJ', 'End-game tactics', 50, 'Koo');

