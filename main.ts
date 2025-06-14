/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { conf } from "utils/config.ts";
import { connectToRedisInBackground as ConnectRedis } from "utils/cache.ts";

async function startApp() {
  if (conf.CACHE?.toLowerCase() === "true") {
    console.log("Initiating Connection to Redis");
    ConnectRedis();
  }
  // Start your server
  await start(manifest, config);
}

startApp().catch((error) => {
  console.error("Failed to start application:", error);
  Deno.exit(1);
});
