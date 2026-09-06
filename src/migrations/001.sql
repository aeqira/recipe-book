CREATE TABLE IF NOT EXISTS "Types" (
    "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Description" TEXT
);

CREATE TABLE IF NOT EXISTS "Difficulties" (
    "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Description" TEXT
);

CREATE TABLE IF NOT EXISTS "Spiciness" (
    "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Description" TEXT
);

CREATE TABLE IF NOT EXISTS "Recipes" (
    "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Subtitle" TEXT,
    "TypeId" INTEGER NOT NULL,
    "DifficultyId" INTEGER NOT NULL,
    "SpicinessId" INTEGER NOT NULL,
    "Time" INTEGER NOT NULL,
    "Tools" TEXT NOT NULL,
    "Ingredients" TEXT NOT NULL,
    "Temperature" INT,
    "Directions" TEXT NOT NULL,
    FOREIGN KEY ("TypeId") REFERENCES "Types"("Id"),
    FOREIGN KEY ("DifficultyId") REFERENCES "Difficulties"("Id"),
    FOREIGN KEY ("SpicinessId") REFERENCES "Spiciness"("Id")
);

INSERT OR IGNORE INTO "Types" ("Id", "Title", "Description") VALUES
    (1, 'Breakfast', 'Breakfast and brunch recipes'),
    (2, 'Lunch', 'Lunch recipes'),
    (3, 'Dinner', 'Dinner recipes'),
    (4, 'Dessert', 'Desserts and sweet treats'),
    (5, 'Snack', 'Snacks and appetizers');

INSERT OR IGNORE INTO "Difficulties" ("Id", "Title", "Description") VALUES
    (1, 'Easy', 'Straightforward recipes for any cook'),
    (2, 'Medium', 'Recipes requiring a little more attention'),
    (3, 'Hard', 'More involved recipes for experienced cooks');

INSERT OR IGNORE INTO "Spiciness" ("Id", "Title", "Description") VALUES
    (0, 'None', 'No spice or heat'),
    (1, 'Mild', 'No noticeable heat'),
    (2, 'Medium', 'A moderate amount of heat'),
    (3, 'Hot', 'For people who enjoy spicy food');
