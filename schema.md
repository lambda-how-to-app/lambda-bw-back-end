Table saved_guides {
id int [pk]
auth_id int [ref: > authenticatedUsers.id]
lifehack_id int [ref: > lifehacks.id]
created_at datetime [default: `now()`]
}

Table lifehack_steps {
id int [pk]
lifehack_id int [ref: > lifehacks.id]
step varchar [not null]
created_at datetime [default: `now()`]
}

Table lifehacks {
id int [pk]
guide_id int [ref: > guides.id]
title int [not null]
created_at datetime [default: `now()`]
}

Table authenticatedUsers {
id int [primary key]
username varchar [unique, not null]
email varchar [unique, not null]
password varchar [unique, not null]
guide boolean
created_at datetime [default: `now()`]
}

Table guides {
id int [primary key]
auth_id int [ref: > authenticatedUsers.id]
fullname varchar [not null]
phone varchar
location int [ref: > locations.id]
created_at datetime [default: `now()`]
updated_at datetime
}
Table users {
id int [primary key]
auth_id int [ref: > authenticatedUsers.id]
fullname varchar [not null]
phone varchar
location int [ref: > locations.id]
created_at datetime [default: `now()`]
updated_at datetime
}

Table locations {
id int [primary key]
country varchar
}

Knex.Schema.createTable('tableName', function(table) {
table.unique(['LoginID', 'Email']);
table.unique('LoginID');
table.unique('Email');
});
