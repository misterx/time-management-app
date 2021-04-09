create extension if not exists pgcrypto;
create extension if not exists pgjwt;


drop schema if exists auth cascade;
create schema auth;
set search_path = auth, public;


create or replace function encrypt_pass() returns trigger as $$
begin
  if length(new.pass) > 0 then
    new.pass = crypt(new.pass, gen_salt('bf'));
  else
    new.pass = old.pass;
  end if;
  return new;
end
$$ language plpgsql;

create or replace function user_role(email text, pass text) returns name as $$
begin
  return (
    select role from data.users
    where users.email = user_role.email
      and users.pass = crypt(user_role.pass, users.pass)
  );
end;
$$ language plpgsql;

create or replace function user_id(email text) returns text as $$
begin
  return (
    select id::text from data.users
    where users.email = user_id.email
  );
end;
$$ language plpgsql;

create or replace function check_role_exists() returns trigger as $$
begin
  if not exists (select 1 from pg_roles as r where r.rolname = new.role) then
    raise foreign_key_violation using message =
          'unknown database role: ' || new.role;
    return null;
  end if;
  return new;
end
$$ language plpgsql;

DROP TYPE IF EXISTS jwt_token;
CREATE TYPE jwt_token AS (
  token text
);