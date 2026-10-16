import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const assetsDir = path.join(root, "src/assets");

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function kebab(s) {
  return s
    .replace(/\.[^.]+$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function folderFor(name) {
  const n = name.toLowerCase();
  if (
    /exhibition|gallery|solo-studio|spice|blessing|hara|daring|earth-sister|closing/.test(
      n,
    )
  )
    return "exhibitions";
  if (/studio|open-studio|immersion|brush|stool|swing|table|sa-landscape/.test(n))
    return "studio";
  if (
    /work|archive|rooting|zerocrete|space|where.?we.?stand|emerald|thespace|wherewestand/.test(
      n,
    )
  )
    return "works";
  if (
    /collab|daft|swartland|roche|hasher|eosc|sdg|commission|frame|nina/.test(n)
  )
    return "collaborations";
  if (/about|portrait|nicky|life-dialogue|nm-/.test(n)) return "about";
  if (/home|hero|header|quote|contact|private-commission|painting-recon/.test(n))
    return "home";
  return "misc";
}

const jsonFiles = walk(assetsDir).filter((f) => f.endsWith(".asset.json"));
const localImgs = walk(assetsDir).filter(
  (f) => /\.(jpe?g|png|webp|gif)$/i.test(f) && !f.includes(".asset.json"),
);

const manifest = [];
const usedKeys = new Set();

function uniqueKey(folder, base, ext) {
  let key = `${folder}/${base}${ext}`;
  let i = 2;
  while (usedKeys.has(key)) {
    key = `${folder}/${base}-${i}${ext}`;
    i++;
  }
  usedKeys.add(key);
  return key;
}

for (const jf of jsonFiles) {
  const meta = JSON.parse(fs.readFileSync(jf, "utf8"));
  const relUrl = meta.url;
  const srcPath = path.join(
    root,
    "public",
    ...relUrl.replace(/^\//, "").split("/"),
  );
  const orig = meta.original_filename || path.basename(relUrl);
  const ext = (path.extname(orig) || path.extname(srcPath)).toLowerCase();
  const base = kebab(orig);
  const folder = folderFor(`${orig} ${path.basename(jf)}`);
  const key = uniqueKey(folder, base, ext);
  manifest.push({
    type: "asset-json",
    jsonPath: path.relative(root, jf).split(path.sep).join("/"),
    srcPath: fs.existsSync(srcPath)
      ? path.relative(root, srcPath).split(path.sep).join("/")
      : null,
    key,
    contentType: meta.content_type || undefined,
    exists: fs.existsSync(srcPath),
  });
}

for (const img of localImgs) {
  const rel = path.relative(assetsDir, img).split(path.sep).join("/");
  const ext = path.extname(img).toLowerCase();
  const base = kebab(path.basename(img));
  const folder = rel.startsWith("exhibitions/") ? "exhibitions" : folderFor(rel);
  const key = uniqueKey(folder, base, ext);
  let contentType = "application/octet-stream";
  if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
  if (ext === ".png") contentType = "image/png";
  if (ext === ".webp") contentType = "image/webp";
  manifest.push({
    type: "local-import",
    srcPath: path.relative(root, img).split(path.sep).join("/"),
    key,
    contentType,
    exists: true,
  });
}

const og = path.join(root, "public/og-home.jpg");
if (fs.existsSync(og)) {
  manifest.push({
    type: "public",
    srcPath: "public/og-home.jpg",
    key: "og/home.jpg",
    contentType: "image/jpeg",
    exists: true,
  });
}

fs.mkdirSync(path.join(root, "scripts"), { recursive: true });
fs.writeFileSync(
  path.join(root, "scripts/r2-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
const missing = manifest.filter((m) => !m.exists);
console.log(`total=${manifest.length} missing=${missing.length}`);
console.log(
  "folders",
  [...new Set(manifest.map((m) => m.key.split("/")[0]))].sort().join(", "),
);
if (missing.length) console.log("missing", missing.slice(0, 8));
