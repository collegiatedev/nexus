-- Custom SQL migration file, put you code below! --
DO $$ 
DECLARE
    task_id INTEGER;
    tag_count INTEGER;
    tag_index INTEGER;
    tag_text TEXT;
    tags TEXT[] := ARRAY['deadline', 'logistics', 'meeting', 'exam', 'school', 'activity', 'project', 'essays'];
BEGIN
    FOR task_id IN 1..23 LOOP
        tag_count := floor(random() * 5); -- 0 to 4 tags
        FOR tag_index IN 1..tag_count LOOP
            tag_text := tags[floor(random() * array_length(tags, 1) + 1)];
            EXECUTE 'INSERT INTO nexus_task_tags (task_id, text) VALUES ($1, $2)' USING task_id, tag_text;
        END LOOP;
    END LOOP;
END $$;