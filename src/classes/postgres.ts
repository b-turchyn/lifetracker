import process from 'process';
import { Client } from 'pg';
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectionString
});
client.connect(function(err, client, done) {
  if (err) {
    console.error("Failed to connect to Postgres database", err);
    process.exit(1);
  }
  console.log(done);

  console.log("Successfully connected to Postgres");

  client.query("SELECT NOW()", (err, res) => {
    console.log(err, res);
  });
});

export default client;
