import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  date,
  boolean,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { TaskTagTypes } from "~/types";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  description: varchar("description", { length: 256 }),
  due_date: date("due_date"),
  done: boolean("done").default(false),
  assigned: varchar("assigned", { length: 256 }),
});
export const tasksRelations = relations(tasks, ({ many }) => ({
  tags: many(taskTags),
}));

export const taskTags = pgTable("task_tags", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").references(() => tasks.id),
  type: text("type", {
    enum: Object.values(TaskTagTypes) as [string, ...string[]],
  }).notNull(),
});
export const taskTagsRelations = relations(taskTags, ({ one }) => ({
  task: one(tasks, { fields: [taskTags.taskId], references: [tasks.id] }),
}));

export type InsertTask = typeof tasks.$inferInsert;
export type InsertTaskTag = typeof taskTags.$inferInsert;
