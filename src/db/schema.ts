import { pgTable, uuid, varchar, bigint } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const admin = pgTable("admin", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    hashedPass: varchar("hashed_pass", { length: 255 }).notNull(),
});

export const sidequest = pgTable("sidequest", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
});

export const teams = pgTable("teams", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: varchar("name", { length: 255 }),
    unstopId: bigint("unstop_id", { mode: "number" }).notNull(),
});

export const judge = pgTable("judge", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    adminId: uuid("admin_id")
        .notNull()
        .references(() => admin.id),
    sidequestId: uuid("sidequest_id")
        .notNull()
        .references(() => sidequest.id),
});

export const points = pgTable("points", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    judgeId: uuid("judge_id")
        .notNull()
        .references(() => judge.id),
    teamId: uuid("team_id")
        .notNull()
        .references(() => teams.id),
    points: bigint("points", { mode: "number" }).notNull(),
});

// Relations
export const adminRelations = relations(admin, ({ many }) => ({
    judges: many(judge),
}));

export const sidequestRelations = relations(sidequest, ({ many }) => ({
    judges: many(judge),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
    points: many(points),
}));

export const judgeRelations = relations(judge, ({ one, many }) => ({
    admin: one(admin, {
        fields: [judge.adminId],
        references: [admin.id],
    }),
    sidequest: one(sidequest, {
        fields: [judge.sidequestId],
        references: [sidequest.id],
    }),
    points: many(points),
}));

export const pointsRelations = relations(points, ({ one }) => ({
    judge: one(judge, {
        fields: [points.judgeId],
        references: [judge.id],
    }),
    team: one(teams, {
        fields: [points.teamId],
        references: [teams.id],
    }),
}));