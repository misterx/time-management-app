create or replace function login(email text, pass text) returns auth.jwt_token as $$
declare
  _role name;
  _id text;
  result auth.jwt_token;
begin
  -- check email and password
  select auth.user_role(email, pass) into _role;

  if _role is null then
    raise invalid_password using message = 'invalid user or password';
  end if;

  select auth.user_id(email) into _id;
  select sign(
             row_to_json(r), '759995ab-e588-4166-a821-47a63725d90a'
           ) as token
  from (
         select _role as role, login.email as email, _id as id,
                extract(epoch from now())::integer + 60*60 as exp
       ) r
       into result;
  return result;
end;
$$ stable security definer language plpgsql;

revoke all privileges on function login(text, text) from public;