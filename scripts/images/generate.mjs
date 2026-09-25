/**
 * Fills public/photos from scripts/images/plan.json, through the Higgsfield API.
 *
 *   node scripts/images/generate.mjs --dry-run          what it would do, no key needed
 *   node scripts/images/generate.mjs --only gal-        just the gallery tiles
 *   node scripts/images/generate.mjs                    everything still missing
 *   node scripts/images/generate.mjs --force            everything, overwriting
 *
 * Needs HIGGSFIELD_API_KEY_ID and HIGGSFIELD_API_KEY_SECRET in the environment
 * for anything but a dry run. They are not read from a file on purpose: this
 * writes into a repository whose .env is not committed, and a key that never
 * touches the tree cannot be committed by accident.
 *
 * **Every run costs money.** A slot that already has a file is skipped unless
 * --force is given, so re-running after a failure regenerates only what failed
 * rather than paying for the thirty that worked.
 *
 * The photographs being replaced are in git. `git checkout public/photos` puts
 * them all back, which is the undo for this script and the reason it does not
 * keep its own backup of 34MB.
 */

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const outDir = join(root, "public", "photos");

const API = "https://api.higgsfield.ai";
const ENDPOINT = "/higgsfield-ai/soul/standard";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;

/** Polling: the API answers `queued` immediately and takes its time after that. */
const POLL_MS = 3000;
const POLL_LIMIT = 100; // five minutes per image before this gives up

const auth = () => {
  const id = process.env.HIGGSFIELD_API_KEY_ID;
  const secret = process.env.HIGGSFIELD_API_KEY_SECRET;
  if (!id || !secret) {
    console.error(
      "\n  HIGGSFIELD_API_KEY_ID and HIGGSFIELD_API_KEY_SECRET are not set.\n" +
        "  Create a key at https://cloud.higgsfield.ai and export both, or pass --dry-run.\n",
    );
    process.exit(1);
  }
  return `Key ${id}:${secret}`;
};

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** One image, from prompt to a file on disk. Throws with a readable reason. */
async function generate(image, style, authorization) {
  const prompt = `${image.prompt} ${style}`;

  const submit = await fetch(API + ENDPOINT, {
    method: "POST",
    headers: { Authorization: authorization, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      aspect_ratio: image.aspect_ratio,
      resolution: image.resolution,
      num_images: 1,
    }),
  });

  if (!submit.ok) {
    throw new Error(`submit failed — HTTP ${submit.status} ${(await submit.text()).slice(0, 300)}`);
  }

  const queued = await submit.json();
  const statusUrl = queued.status_url ?? `${API}/requests/${queued.request_id}/status`;

  for (let attempt = 0; attempt < POLL_LIMIT; attempt++) {
    await sleep(POLL_MS);
    const poll = await fetch(statusUrl, { headers: { Authorization: authorization } });
    if (!poll.ok) throw new Error(`status failed — HTTP ${poll.status}`);
    const state = await poll.json();

    if (state.status === "completed") {
      const url = state.images?.[0]?.url;
      if (!url) throw new Error("completed with no image url");
      const bytes = Buffer.from(await (await fetch(url)).arrayBuffer());
      await writeFile(join(outDir, image.file), bytes);
      return bytes.length;
    }
    // `nsfw` is a refusal, not a transient state — retrying it changes nothing.
    if (["failed", "canceled", "nsfw"].includes(state.status)) {
      throw new Error(`${state.status}${state.error ? ` — ${state.error}` : ""}`);
    }
  }
  throw new Error(`still ${"queued/in_progress"} after ${(POLL_MS * POLL_LIMIT) / 1000}s`);
}

const plan = JSON.parse(await readFile(join(here, "plan.json"), "utf8"));
await mkdir(outDir, { recursive: true });

const wanted = plan.images.filter((i) => !only || i.file.includes(only));
const todo = [];
for (const image of wanted) {
  const present = await exists(join(outDir, image.file));
  if (present && !force) continue;
  todo.push({ ...image, replacing: present });
}

console.log(
  `\n  ${plan.images.length} slots in the plan` +
    (only ? `, ${wanted.length} match "${only}"` : "") +
    `\n  ${todo.length} to generate${force ? " (--force)" : ""}, ` +
    `${wanted.length - todo.length} already on disk\n`,
);

if (dryRun) {
  for (const image of todo) {
    console.log(
      `  ${image.replacing ? "replace" : "create "}  ${image.file.padEnd(26)} ` +
        `${image.aspect_ratio.padEnd(5)} ${image.resolution}  ${image.slot}`,
    );
  }
  console.log(`\n  Dry run — nothing was sent and nothing was written.\n`);
  process.exit(0);
}

const authorization = auth();
let made = 0;
const failed = [];

for (const [index, image] of todo.entries()) {
  const label = `[${index + 1}/${todo.length}] ${image.file}`;
  process.stdout.write(`  ${label} … `);
  try {
    const size = await generate(image, plan.style, authorization);
    made++;
    console.log(`${Math.round(size / 1024)}KB`);
  } catch (error) {
    failed.push({ file: image.file, reason: error.message });
    console.log(`FAILED — ${error.message}`);
  }
}

console.log(`\n  ${made} written, ${failed.length} failed.`);
if (failed.length) {
  console.log("  Re-run to retry only these — what succeeded is on disk and will be skipped.\n");
  for (const f of failed) console.log(`    ${f.file}: ${f.reason}`);
  process.exit(1);
}
console.log();
