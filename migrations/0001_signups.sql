-- Collector list sign-ups from /collect (QR business cards, flyers, ...).
CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  -- Event invites asked for, as "Event A; Event B" (names from INVITE_EVENTS).
  invites TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'direct'
);
