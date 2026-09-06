UPDATE "Types" SET "Title" = 'Breakfast', "Description" = 'Breakfast and brunch recipes' WHERE "Id" = 1;
UPDATE "Types" SET "Title" = 'Lunch', "Description" = 'Lunch recipes' WHERE "Id" = 2;
UPDATE "Types" SET "Title" = 'Dinner', "Description" = 'Dinner recipes' WHERE "Id" = 3;
INSERT OR IGNORE INTO "Types" ("Id", "Title", "Description") VALUES
    (4, 'Dessert', 'Desserts and sweet treats'),
    (5, 'Snack', 'Snacks and appetizers');

UPDATE "Difficulties" SET "Title" = 'Easy', "Description" = 'Straightforward recipes for any cook' WHERE "Id" = 1;
UPDATE "Difficulties" SET "Title" = 'Medium', "Description" = 'Recipes requiring a little more attention' WHERE "Id" = 2;
INSERT OR IGNORE INTO "Difficulties" ("Id", "Title", "Description")
VALUES (3, 'Hard', 'More involved recipes for experienced cooks');

UPDATE "Spiciness" SET "Title" = 'Mild', "Description" = 'A small amount of heat' WHERE "Id" = 1;
UPDATE "Spiciness" SET "Title" = 'Medium', "Description" = 'A moderate amount of heat' WHERE "Id" = 2;
UPDATE "Spiciness" SET "Title" = 'Hot', "Description" = 'For people who enjoy spicy food' WHERE "Id" = 3;
INSERT OR IGNORE INTO "Spiciness" ("Id", "Title", "Description")
VALUES (0, 'None', 'No spice or heat');
