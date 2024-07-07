-- Custom SQL migration file, put you code below! --
-- Drop foreign keys for task_tags
ALTER TABLE nexus_task_tags DROP CONSTRAINT IF EXISTS nexus_task_tags_task_id_fkey;

-- Drop the task_tags table
DROP TABLE IF EXISTS nexus_task_tags;

-- Create the task_tags table again based on the new schema
CREATE TABLE nexus_task_tags (
    task_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (task_id, type)
);
