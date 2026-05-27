import { createClient } from "@libsql/client";
import * as fs from 'fs';

// Connect to local DB
const localDb = createClient({ url: "file:./dev.db" });

// Connect to remote DB
const remoteDb = createClient({
  url: "libsql://enrollmentsystem-tradertres.aws-ap-northeast-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzk5MjAwODQsImlkIjoiMDE5ZTZiN2YtNmMwMS03NTQ1LTg2OTYtZTUwN2FhZmQzYTk1IiwicmlkIjoiMTEzMTlkZmQtNzI3Yi00YmQ4LTkzODktYjZkOTMxYTczNmFmIn0.YgCVLTQFp03qbzLofMawHsX7quPQZ6eMIPVRQYzjiPiEP7u3olooRqcH2IvhEv2uQKe43_MNqz4WYOt365ztCg"
});

async function migrate() {
  console.log("Starting migration to Turso...");
  
  // Get all table definitions from local DB
  const tables = await localDb.execute("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
  
  for (const table of tables.rows) {
    const tableName = table.name;
    const createSql = table.sql;
    
    console.log(`Creating table ${tableName}...`);
    try {
      await remoteDb.execute(createSql);
    } catch(e) {
      console.log(`Table ${tableName} might already exist or error:`, e.message);
    }
  }
  
  console.log("Tables created successfully on Turso!");
  console.log("Seeding data will be handled by npm run db:seed.");
}

migrate().catch(console.error);
