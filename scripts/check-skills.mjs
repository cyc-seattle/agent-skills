import { readFileSync, readdirSync } from "node:fs";

const errors = [];

for (const file of [".claude-plugin/marketplace.json", ".claude-plugin/plugin.json"]) {
  try {
    JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
}

function checkFrontmatter(file, name, owner) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    errors.push(`${file}: missing`);
    return;
  }
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    errors.push(`${file}: no frontmatter`);
    return;
  }
  const fields = Object.fromEntries(
    frontmatter[1]
      .split("\n")
      .map((line) => line.match(/^(\w+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.trim()]),
  );
  if (fields.name !== name) errors.push(`${file}: name "${fields.name}" does not match ${owner}`);
  if (!fields.description) errors.push(`${file}: description is empty`);
}

for (const entry of readdirSync("skills", { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  checkFrontmatter(`skills/${entry.name}/SKILL.md`, entry.name, "directory");
}

for (const entry of readdirSync("agents", { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
  checkFrontmatter(`agents/${entry.name}`, entry.name.slice(0, -".md".length), "file name");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Skills, agents, and manifests are valid.");
