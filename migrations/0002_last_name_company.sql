-- Collector list: last name and optional company.
ALTER TABLE signups ADD COLUMN last_name TEXT NOT NULL DEFAULT '';
ALTER TABLE signups ADD COLUMN company TEXT NOT NULL DEFAULT '';
