-- Custom SQL migration file, put you code below! --
DO $$ 
DECLARE
    task_id INTEGER;
    tag_count INTEGER;
    tag_index INTEGER;
    tag_type TEXT;
    tags TEXT[] := ARRAY['deadline', 'logistics', 'meeting', 'exam', 'school', 'activity', 'project', 'essays'];
BEGIN
    FOR task_id IN 1..23 LOOP
        tag_count := floor(random() * 5); -- 0 to 4 tags
        FOR tag_index IN 1..tag_count LOOP
            tag_type := tags[floor(random() * array_length(tags, 1) + 1)];
            BEGIN
                -- Attempt to insert, if duplicate key violation occurs, do nothing
                EXECUTE 'INSERT INTO task_tags (task_id, type) VALUES ($1, $2)' USING task_id, tag_type;
            EXCEPTION
                WHEN unique_violation THEN
                    -- Do nothing, skip to next iteration
                    NULL;
            END;
        END LOOP;
    END LOOP;
END $$;