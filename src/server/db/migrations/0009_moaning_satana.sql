-- Custom SQL migration file, put you code below! --
DROP TABLE nexus_task_tags;
CREATE TABLE nexus_task_tags (
    task_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (task_id, type)
);