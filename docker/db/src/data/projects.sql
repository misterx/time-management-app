create extension if not exists "uuid-ossp";
create table projects (
      id UUID NOT NULL default uuid_generate_v4() primary key,
      name text not null check (length(name) < 512)
);