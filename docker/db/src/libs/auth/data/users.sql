create extension if not exists "uuid-ossp";
create table if not exists
  users (
                     id UUID NOT NULL default uuid_generate_v4() primary key,
                     email    text not null check ( email ~* '^.+@.+\..+$' ) unique ,
                     pass     text not null check (length(pass) < 512),
                     role     name not null check (length(role) < 512),
                     name text not null check (length(pass) < 512)
);

create constraint trigger ensure_user_role_exists
  after insert or update on users
  for each row
execute procedure auth.check_role_exists();

create trigger encrypt_pass
  before insert or update on users
  for each row
execute procedure auth.encrypt_pass();