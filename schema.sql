CREATE TABLE "Users" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "username" varchar,
  "first_name" varchar,
  "surname" varchar,
  "email" varchar UNIQUE,
  "password" varchar,
  "phone_number" varchar,
  "location" varchar,
  "user_type" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "Implements" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar,
  "description" text,
  "price" decimal,
  "location" varchar,
  "availability_status" varchar,
  "user_id" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "ImplementImages" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "implement_id" int,
  "image_url" varchar,
  "created_at" timestamp
);

CREATE TABLE "Services" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar,
  "description" text,
  "price_per_hour" decimal,
  "location" varchar,
  "availability_status" varchar,
  "user_id" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "Transactions" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "transaction_type" varchar,
  "status" varchar,
  "implement_id" int,
  "service_id" int,
  "buyer_id" int,
  "seller_id" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "Implements" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "ImplementImages" ADD FOREIGN KEY ("implement_id") REFERENCES "Implements" ("id");

ALTER TABLE "Services" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "Transactions" ADD FOREIGN KEY ("implement_id") REFERENCES "Implements" ("id");

ALTER TABLE "Transactions" ADD FOREIGN KEY ("service_id") REFERENCES "Services" ("id");

ALTER TABLE "Transactions" ADD FOREIGN KEY ("buyer_id") REFERENCES "Users" ("id");

ALTER TABLE "Transactions" ADD FOREIGN KEY ("seller_id") REFERENCES "Users" ("id");
