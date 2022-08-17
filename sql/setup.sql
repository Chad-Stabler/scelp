-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table if exists scelp_users cascade;
drop table if exists restaurants cascade;
drop table if exists reviews cascade;
drop table if exists reviews_restaurants cascade;

create table scelp_users (
    id bigint generated always as identity primary key,
    first_name varchar not null,
    last_name varchar,
    email varchar not null,
    password_hash varchar not null
);

create table restaurants (
    id bigint generated always as identity primary key,
    name varchar not null,
    description varchar not null
);

create table reviews (
    id bigint generated always as identity primary key,
    scelp_users_id int,
    restaurants_id int,
    foreign key (scelp_users_id) references scelp_users(id),
    foreign key (restaurants_id) references restaurants(id),
    stars int not null,
    detail varchar
);

create table reviews_restaurants (
    id bigint generated always as identity primary key,
    reviews_id int,
    restaurants_id int,
    foreign key (reviews_id) references reviews(id),
    foreign key (restaurants_id) references restaurants(id)
);

insert into restaurants (name, description) values
    ('restaurant A', 'Serves American food'),
    ('restaurant B', 'Serves Seafood'),
    ('resaurant C', 'Serves traditional Chinese food'),
    ('restaurant D', 'Serves Mongolian');

insert into reviews (stars, detail) values
    (3, 'Good burgers'),
    (4, 'super fast service'),
    (4, 'Delicious Seabass'),
    (4, 'Love the Lo Mein'),
    (3, 'Great atmoshpere, good service');

insert into reviews_restaurants (restaurants_id, reviews_id) values
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5);
