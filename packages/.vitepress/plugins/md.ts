import { resolve, join } from "path";
import { existsSync } from "fs";
import { Plugin } from "vite";
import {
  getTypeDefinition,
  isPublicFunctionName,
  ROOT_DIR,
  GITHUB_BLOB_URL,
} from "./helper";

const genTypeDeclarationContent = async (pkg: string, name: string) => {
  const types = await getTypeDefinition(pkg, name);

  if (!types) return "";

  const code = `\`\`\`typescript\n${types.trim()}\n\`\`\``;
  return types.length > 1000
    ? `
## Type Declarations

<details>
<summary op50 italic>Show Type Declarations</summary>

${code}

</details>
`
    : `\n## Type Declarations\n\n${code}`;
};

const genDemoContent = (pkg: string, name: string) => {
  const dir = join(ROOT_DIR, "./packages", pkg, name);
  const URL = `${GITHUB_BLOB_URL}/${pkg}/${name}`;

  const demoFileName = ["demo.vue", "demo.client.vue"].find((t) =>
    existsSync(join(dir, t))
  );

  if (demoFileName) {
    return `
<script setup>
import Demo from \'./${demoFileName}\'
</script>

## Demo

<DemoContainer>
<p class="demo-source-link"><a href="${URL}/${demoFileName}" target="_blank">source</a></p>
<Demo/>
</DemoContainer>
    `;
  }
  return "";
};

export const mdPlugin = (): Plugin => {
  const DIR_TYPES = resolve(__dirname, "../../../types");
  const hasTypes = existsSync(DIR_TYPES);

  if (!hasTypes) {
    console.warn("No types dist found, run `npm run build:types` first.");
  }

  return {
    name: "md-transform",
    enforce: "pre",
    transform: async (code, id) => {
      if (!id.match(/\.md\b/)) {
        return null;
      }

      const [pkg, name, i] = id.split("/").slice(-3);

      if (isPublicFunctionName(pkg, name) && i === "index.md") {
        const firstSubheader = code.search(/\n## \w/);

        const typeDeclarationContent = await genTypeDeclarationContent(
          pkg,
          name
        );
        const demoContent = genDemoContent(pkg, name);

        if (typeDeclarationContent) {
          code = code + "\n\n" + typeDeclarationContent;
        }
        code =
          code.slice(0, firstSubheader) +
          "\n\n" +
          demoContent.trim() +
          "\n\n" +
          code.slice(firstSubheader);
      }

      return code;
    },
  };
};
