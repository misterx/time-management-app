drop schema if exists request cascade;
create schema request;
grant usage on schema request to public;

create or replace function request.user_id() returns text as $$
select current_setting('request.jwt.claim.id',true)
 $$ stable language sql;

create or replace function request.user_role() returns text as $$
select current_setting('request.jwt.claim.role',true)
$$ stable language sql;