-- Разрешаем использование схемы
grant usage on schema api,auth to time_anon;
-- Разрешаем логинится для анонимуса
grant execute on function api.login(text,text) to time_anon;

-- Отладочная инфа
grant select on table api.debug to time_anon;

-- Разрешаем выборку проджектов для юзера
grant select on table api.projects to time_user;
-- Разрешаем круд для юзера
grant all on table api.tasks to time_user;

-- Разрешаем круд проджектов для адина
grant all on table api.projects to time_admin;
-- Разрешаем круд юзеров для админа
grant all on table api.users to time_admin;
-- Даем доступ к репортам
grant select on table api.report_by_day,api.report_by_month to time_admin;
grant execute on function api.report_by_range(text,text) to time_admin;

-- У всех view которые должны использовать RLS должен быть владелец api
-- а также нужно дать права на зпись для этого пользователя, т.к. запись в дочернюю таблицу
-- производится от имени владельца view
-- Воркфлоу
-- Request
-- View access as JWT user
-- Pivot table access as View owner

alter table data.tasks enable row level security;
grant all on data.tasks to api;

drop policy if exists tasks_access_policy on data.tasks;
create policy tasks_access_policy on data.tasks to api
  using
  (
    (request.user_role()='time_user' and request.user_id()::uuid = user_id)
    OR
    (request.user_role()='time_admin')
  )

  with check
  (
    (
        (request.user_role()='time_user' and request.user_id()::uuid = user_id)
      AND
        ( (current_date - interval '7 days') < "date" )
    )
      OR
    (request.user_role()='time_admin')
  );

