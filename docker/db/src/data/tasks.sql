create extension if not exists "uuid-ossp";
create table tasks (
      id UUID NOT NULL default uuid_generate_v4() primary key,
      date date not null,
      description text not null check (length(description) < 512),
      spent_hours numeric(3,1) not null check (spent_hours>0),
      user_id uuid not null references users(id) default request.user_id()::uuid,
      project_id uuid not null references projects(id)
);