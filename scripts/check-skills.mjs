import { readFileSync, readdirSync } from "node:fs";

const errors = [];

for (const file of [".claude-plugin/marketplace.json", ".claude-plugin/plugin.json"]) {
  try {
    JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
}

for (const entry of readdirSync("skills", { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = `skills/${entry.name}/SKILL.md`;
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    errors.push(`${file}: missing`);
    continue;
  }
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    errors.push(`${file}: no frontmatter`);
    continue;
  }
  const fields = Object.fromEntries(
    frontmatter[1]
      .split("\n")
      .map((line) => line.match(/^(\w+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.trim()]),
  );
  if (fields.name !== entry.name) errors.push(`${file}: name "${fields.name}" does not match directory`);
  if (!fields.description) errors.push(`${file}: description is empty`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Skills and manifests are valid.");
