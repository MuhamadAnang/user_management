const { migrate } = require('drizzle-orm/mysql2/migrator');
const { db, connection } = require('./db');

async function runMigrations() {
  try {
    // Perform migrations
    await migrate(db, { migrationsFolder: './drizzle' });

    console.log('Migrations completed successfully.');

  } catch (error) {
    console.error('Error running migrations:', error);

  } finally {
    // Close the database connection
    (await connection).end; // Assuming `db` is your connection object
    console.log('Database connection closed.');
  }
}

// Run the migrations
runMigrations();
