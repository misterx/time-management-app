\echo # Loading database definition
begin;

\echo #Load deps
\ir libs/request/schema.sql
\ir libs/auth/schema.sql

\echo # Loading application definitions
-- private schema where all tables will be defined
-- you can use othere names besides "data" or even spread the tables
-- between different schemas. The schema name "data" is just a convention
\ir data/schema.sql
-- entities inside this schema (which should be only views and stored procedures) will be
-- exposed as API endpoints. Access to them however is still governed by the
-- privileges defined for the current PostgreSQL role making the requests
\ir api/schema.sql

\ir security/roles.sql
\ir security/privileges.sql


\ir data/fixture.sql

commit;