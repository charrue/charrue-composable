import fs from "fs";
import fg from "fast-glob";

export async function fixTypes() {
  const files = await fg(["types/**/*.d.ts", "packages/*/dist/*.d.ts"], {
    onlyFiles: true,
  });

  files.forEach((f) => {
    const raw = fs.readFileSync(f, "utf-8");
    const changed = raw
      .replace(/"@vue\/composition-api"/g, "'vue-demi'")
      .replace(/"vue"/g, "'vue-demi'")
      .replace(/'vue'/g, "'vue-demi'");
    fs.writeFileSync(f, changed, "utf-8");
  });
}

fixTypes();
