CREATE OR REPLACE VIEW tasks AS
select * from data.tasks;
alter view tasks owner to api;