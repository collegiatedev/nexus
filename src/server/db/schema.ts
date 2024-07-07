import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  date,
  boolean,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
// import { TaskTagTypes } from "~/types";

export const createTable = pgTableCreator((name) => `nexus_${name}`);

export const tasks = createTable("task", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  // change to json type
  description: varchar("description", { length: 256 }),
  isDone: boolean("done").default(false).notNull(),
  assignedTo: varchar("assigned", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  dueDate: date("due_date", { mode: "date" }),
});
export const tasksRelations = relations(tasks, ({ many }) => ({
  tags: many(taskTags),
}));

enum TaskTagTypes {
  Deadline = "deadline",
  Logistics = "logistics",
  Meeting = "meeting",
  Exam = "exam",
  School = "school",
  Activity = "activity",
  Project = "project",
  Essays = "essays",
}

export const taskTags = createTable(
  "task_tags",
  {
    taskId: integer("task_id").notNull(),
    type: text("type", {
      enum: Object.values(TaskTagTypes) as [string, ...string[]],
    }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ name: "id", columns: [table.taskId, table.type] }),
    };
  },
);
export const taskTagsRelations = relations(taskTags, ({ one }) => ({
  task: one(tasks, { fields: [taskTags.taskId], references: [tasks.id] }),
}));

export type SelectTask = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;
