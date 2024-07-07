CREATE TABLE IF NOT EXISTS "nexus_task_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"task_id" integer,
	"text" text
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "nexus_task" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" varchar(256),
	"done" boolean DEFAULT false,
	"assigned" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"due_date" date
);
--> statement-breakpoint

DO $$ BEGIN
  -- Drop existing foreign key constraint if it exists
  ALTER TABLE "nexus_task_tags" DROP CONSTRAINT IF EXISTS "nexus_task_tags_task_id_nexus_task_id_fk";
  -- Alter the column type
  ALTER TABLE "nexus_task_tags" ALTER COLUMN "task_id" TYPE integer USING "task_id"::integer;
  -- Add the foreign key constraint
  ALTER TABLE "nexus_task_tags" ADD CONSTRAINT "nexus_task_tags_task_id_nexus_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."nexus_task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
