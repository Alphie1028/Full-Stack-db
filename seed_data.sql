CREATE TABLE developers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO developers (name) VALUES
  ('Rockstar Games'),
  ('Ubisoft'),
  ('Electronic Arts'),
  ('Bethesda Softworks'),
  ('Blizzard Entertainment');

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL,
  developer_id INT NOT NULL,
  FOREIGN KEY (developer_id) REFERENCES developers (id)
);

INSERT INTO games (name, genre, developer_id) VALUES
  ('Grand Theft Auto V', 'Action-Adventure', 1),
  ('Assassin''s Creed Odyssey', 'Action-Adventure', 2),
  ('FIFA 22', 'Sports', 3),
  ('Fallout 4', 'Action RPG', 4),
  ('World of Warcraft', 'MMORPG', 5);
  ('Read Dead Redemtion 2', 'Action-Adventure', 1);
  ('Assasin''s Creed Valhalla', 'Action-Adventure', 2);
  ('Division 2', 'Looter-Shooter', 2);
  ('RB6 Siege', 'Tactical-Shooter', 2);
  ('Star Wars Battlefront', 'Action-shooter', 3);
  ('Star Wars Battlefront 2', 'Action-shooter', 3);
  ('Battlefield 2042', 'FPS', 3);
  ('Battlefield 5', 'FPS', 3);
  ('Battlefield 4', 'FPS', 3);
  ('Fallout 76', 'MMORPG', 4);
  ('Skyrim', 'RPG', 4);
  ('Oblivion', 'RPG', 4);
  ('Fallout New Vegas', 'RPG', 4);
  ('Morrowind', 'RPG', 4);
  ('Starcraft', 'RTS', 5);
