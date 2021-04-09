CREATE OR REPLACE VIEW report_by_month AS
select data.uuid_generate_v4() as id, user_id,SUM(spent_hours) as hours,extract(month from date) as month, extract(year from date) as year,project_id from data.tasks group by user_id,month,year,project_id;


CREATE OR REPLACE VIEW report_by_day AS
select data.uuid_generate_v4() as id, user_id,SUM(spent_hours) as hours,date,project_id from data.tasks group by user_id,date,project_id;


create or replace function report_by_range("start_at" text,"end_at" text)
  returns table(id uuid,user_id uuid,project_id uuid, hours numeric ) as $$
    select  data.uuid_generate_v4() as id,user_id,project_id,sum(spent_hours) as hours
    from data.tasks
    where start_at::date<=date and end_at::date>=date
    group by user_id,project_id
$$ stable security definer language sql;