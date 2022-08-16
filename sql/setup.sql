-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table if exists scelp_users;

create table scelp_users (
    id bigint generated always as identity,
    first_name varchar not null,
    last_name varchar,
    email varchar not null primary key,
    password_hash varchar not null
);
