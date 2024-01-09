CREATE DATABASE PetMed;

CREATE TABLE users (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  email VARCHAR(128) UNIQUE,
  password CHAR(60) NOT NULL,
  image_url VARCHAR(128),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);

CREATE TABLE households (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(64),
  owner_id UUID,
  FOREIGN KEY (owner_id) REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);

CREATE TABLE user_households (
  user_id UUID,
	household_id UUID,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (household_id) REFERENCES households(id),
  PRIMARY KEY (user_id, household_id)
);

CREATE TABLE pets (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  species VARCHAR(32) NOT NULL,
  birthdate DATE NOT NULL,
  image_url VARCHAR(128),
  weight SMALLINT NOT NULL, 
  household_id UUID,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  FOREIGN KEY (household_id) REFERENCES households(id)
);

CREATE TABLE dosage_units (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(64)
);
INSERT INTO dosage_units (name) VALUES ('mg (milligrams)'), ('units (insulin)'), ('mL (milliliters)'), ('tsp (teaspoons)'), ('tbsp (tablespoons)'), ('tablets'), ('caplets'), ('pills');


CREATE TABLE medications (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(64),
  pet_id UUID,
  dosage_amount VARCHAR(64) NOT NULL,
  dosage_unit UUID,
  start_date DATE DEFAULT CURRENT_TIMESTAMP,
  end_date DATE DEFAULT CURRENT_TIMESTAMP + INTERVAL '10 years',
  notes VARCHAR(1024),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  FOREIGN KEY (dosage_unit) REFERENCES dosage_units(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id)
);

CREATE TABLE medication_schedule (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scheduled_time TIME NOT NULL,
  medication_id UUID,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  FOREIGN KEY (medication_id) REFERENCES medications(id)
);

CREATE TABLE medication_log (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  medication_id UUID,
  scheduled_medication_id UUID,
  administering_user_id UUID,
  administration_time TIMESTAMPTZ NOT NULL,
  time_logged TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (administering_user_id) REFERENCES users(id),
  FOREIGN KEY (medication_id) REFERENCES medications(id),
  FOREIGN KEY (scheduled_medication_id) REFERENCES medication_schedule(id)
);


CREATE OR REPLACE FUNCTION reassign_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP; 
   RETURN NEW;
END;
$$ language 'plpgsql';


CREATE TRIGGER reassign_users_updated_at BEFORE UPDATE
    ON users FOR EACH ROW EXECUTE PROCEDURE 
    reassign_updated_at_column();
  
CREATE TRIGGER reassign_households_updated_at BEFORE UPDATE
    ON households FOR EACH ROW EXECUTE PROCEDURE 
    reassign_updated_at_column();  
  
CREATE TRIGGER reassign_pets_updated_at BEFORE UPDATE
    ON pets FOR EACH ROW EXECUTE PROCEDURE 
    reassign_updated_at_column();
    
CREATE TRIGGER reassign_medications_updated_at BEFORE UPDATE
    ON medications FOR EACH ROW EXECUTE PROCEDURE 
    reassign_updated_at_column();

CREATE TRIGGER reassign_medication_schedule_updated_at BEFORE UPDATE
    ON medication_schedule FOR EACH ROW EXECUTE PROCEDURE 
    reassign_updated_at_column();