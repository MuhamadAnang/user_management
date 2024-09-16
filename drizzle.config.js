const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
    schema: './drizzle/schema.js',
    out: './drizzle/migrations',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DB_URL,
    },
});