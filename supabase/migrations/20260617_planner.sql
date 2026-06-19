-- Telegram planning bot tables
-- Run this in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS planner_leads (
  id        BIGSERIAL PRIMARY KEY,
  name      TEXT NOT NULL,
  channel   TEXT NOT NULL DEFAULT 'other', -- kwork | b2b | telegram | other
  amount    NUMERIC NOT NULL DEFAULT 0,
  status    TEXT NOT NULL DEFAULT 'new',   -- new | negotiating | won | lost
  notes     TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS planner_log (
  id           BIGSERIAL PRIMARY KEY,
  date         DATE NOT NULL UNIQUE,
  earned_today NUMERIC NOT NULL DEFAULT 0,
  notes        TEXT,
  plan_text    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS off for service role access
ALTER TABLE planner_leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE planner_log   DISABLE ROW LEVEL SECURITY;
