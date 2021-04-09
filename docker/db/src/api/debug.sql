CREATE OR REPLACE VIEW debug(
                                                                          key,
                                                                          value
  ) AS
  select 'Current role', current_user
  UNION
  select 'Current userId', request.user_id();