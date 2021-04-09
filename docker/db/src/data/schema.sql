drop schema if exists data cascade;
create schema data;
set search_path = data, public;

\ir ../libs/auth/data/users.sql
\ir projects.sql
\ir tasks.sql