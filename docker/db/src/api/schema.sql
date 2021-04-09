drop schema if exists api cascade;
create schema api;
set search_path = api, public;

drop role if exists api;
create role api;
grant api to current_user;

\ir ../libs/auth/api/all.sql
\ir debug.sql
\ir projects.sql
\ir tasks.sql
\ir users.sql
\ir reports.sql