import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const MEDIA_BASE = "https://pub-50ab45c4f2c5479c9432ad8d78e7e2f6.r2.dev";
const BUCKET = "nickymyny-media";
const CONCURRENCY = 4;
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "scripts/r2-manifest.json"), "utf8"),
);

function putObject(item) {
  return new Promise((resolve) => {
    if (!item.exists || !item.srcPath) {
      resolve({ ok: false, item, err: "missing" });
      return;
    }
    const abs = path.join(root, item.srcPath);
    const args = [
      "exec",
      "wrangler",
      "r2",
      "object",
      "put",
      `${BUCKET}/${item.key}`,
      `--file=${abs}`,
      "--remote",
    ];
    if (item.contentType) args.push(`--content-type=${item.contentType}`);
    const child = spawn("pnpm", args, { cwd: root, shell: true });
    let err = "";
    child.stderr.on("data", (d) => {
      err += d.toString();
    });
    child.on("close", (code) => {
      resolve({ ok: code === 0, item, err });
    });
  });
}

const map = {};
let ok = 0;
let fail = 0;
const queue = [...manifest];

async function worker() {
  while (queue.length) {
    const item = queue.shift();
    const res = await putObject(item);
    if (!res.ok) {
      console.error("FAIL", item.key, res.err.slice(0, 200));
      fail++;
      continue;
    }
    const url = `${MEDIA_BASE}/${item.key}`;
    map[item.srcPath] = url;
    if (item.type === "asset-json" && item.jsonPath) {
      const jp = path.join(root, item.jsonPath);
      const meta = JSON.parse(fs.readFileSync(jp, "utf8"));
      meta.url = url;
      meta.r2_key = item.key;
      fs.writeFileSync(jp, `${JSON.stringify(meta, null, 2)}\n`);
    }
    console.log("ok", item.key);
    ok++;
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

fs.writeFileSync(
  path.join(root, "scripts/r2-url-map.json"),
  JSON.stringify({ MEDIA_BASE, map }, null, 2),
);
console.log(`done ok=${ok} fail=${fail}`);
if (fail) process.exit(1);
