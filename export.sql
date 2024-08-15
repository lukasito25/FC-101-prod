PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE entries (
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
INSERT INTO entries VALUES(1,'2024-08-14','Training',1,'Increase endurance','Improve speed',90,80,3);
INSERT INTO entries VALUES(2,'2024-08-15','Recovery',2,'Muscle recovery','Flexibility improvement',60,50,2);
INSERT INTO entries VALUES(3,'2024-08-16','Match',3,'Tactical play','Team coordination',120,90,4);
INSERT INTO entries VALUES(4,'2022-10-12','Training',2,'Speed endurance','',40,40,'');
INSERT INTO entries VALUES(5,'2022-08-08','Training',2,'Running','',60,80,'');
INSERT INTO entries VALUES(6,'2012-12-12','Training',1,'Run at speed','',40,40,'');
CREATE TABLE exercises (
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
INSERT INTO exercises VALUES(1,1,'HT','PC','HCJ','Warm-up drill',15,'R');
INSERT INTO exercises VALUES(2,1,'HN','HC','HK','Main drill',60,'S');
INSERT INTO exercises VALUES(3,2,'RC','PH','HS','Stretching and cool down',30,'Koo');
INSERT INTO exercises VALUES(4,2,'NP','VH','SHS','Hydration and rest',30,'V');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('entries',6);
INSERT INTO sqlite_sequence VALUES('exercises',4);
COMMIT;
