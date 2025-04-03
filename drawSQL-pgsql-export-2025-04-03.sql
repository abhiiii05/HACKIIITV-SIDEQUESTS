CREATE TABLE "admin"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "hashed_pass" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "admin" ADD PRIMARY KEY("id");
CREATE TABLE "sidequest"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "sidequest" ADD PRIMARY KEY("id");
CREATE TABLE "teams"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NULL,
    "unstop_id" BIGINT NOT NULL
);
ALTER TABLE
    "teams" ADD PRIMARY KEY("id");
CREATE TABLE "points"(
    "id" UUID NOT NULL,
    "judge_id" UUID NOT NULL DEFAULT 'Foreign',
    "team_id" UUID NOT NULL,
    "points" BIGINT NOT NULL
);
ALTER TABLE
    "points" ADD PRIMARY KEY("id");
CREATE TABLE "judge"(
    "id" UUID NOT NULL,
    "admin_id" UUID NOT NULL,
    "sidequest_id" UUID NOT NULL
);
ALTER TABLE
    "judge" ADD PRIMARY KEY("id");
ALTER TABLE
    "points" ADD CONSTRAINT "points_team_id_foreign" FOREIGN KEY("team_id") REFERENCES "teams"("id");
ALTER TABLE
    "judge" ADD CONSTRAINT "judge_sidequest_id_foreign" FOREIGN KEY("sidequest_id") REFERENCES "sidequest"("id");
ALTER TABLE
    "points" ADD CONSTRAINT "points_judge_id_foreign" FOREIGN KEY("judge_id") REFERENCES "judge"("id");
ALTER TABLE
    "judge" ADD CONSTRAINT "judge_admin_id_foreign" FOREIGN KEY("admin_id") REFERENCES "admin"("id");