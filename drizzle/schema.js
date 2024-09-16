const { mysqlTable, varchar, int } = require('drizzle-orm/mysql-core');

const usersTable = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', {length: 255}).notNull(),
    username: varchar('username', {length: 255}).notNull().unique(),
    email: varchar('email', {length: 255}).notNull(),
    password: varchar('password', {length: 255}).notNull()
});

module.exports = { usersTable };
