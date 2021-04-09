create role authenticator noinherit nologin;
create role time_anon nologin;
create role time_user nologin;
create role time_admin nologin;

grant time_anon to authenticator;
grant time_user to authenticator;
grant time_admin to authenticator;

grant time_anon to time_user;
grant time_user to time_admin;