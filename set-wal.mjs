import { createClient } from "@libsql/client";

const client = createClient({
  url: "file:./dev.db",
});

async function run() {
  await client.execute("PRAGMA journal_mode = WAL;");
  console.log("Database set to WAL mode successfully!");
}

run();
