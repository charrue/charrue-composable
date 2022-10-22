import { existsSync, readFileSync } from "fs";
import { join, resolve } from "path";

export const ROOT_DIR = resolve(__dirname, "../../../");
export const GITHUB_BLOB_URL =
  "https://github.com/charrue/composable/blob/main/packages";

const TYPE_DIR = resolve(ROOT_DIR, "types");

const publicPkg = ["composable"];
export const isPublicFunctionName = (pkg: string, name: string) => {
  return publicPkg.includes(pkg) && name?.startsWith("use");
};

export async function getTypeDefinition(
  pkg: string,
  name: string
): Promise<string | undefined> {
  const typingFilepath = join(TYPE_DIR, `${pkg}/${name}/index.d.ts`);

  if (!existsSync(typingFilepath)) return;

  let types = readFileSync(typingFilepath, "utf-8");

  if (!types) {
    return;
  }

  // clean up types
  types = types
    .replace(/import\(.*?\)\./g, "")
    .replace(/import[\s\S]+?from ?["'][\s\S]+?["']/g, "")
    .replace(/export {}/g, "");

  const prettier = await import("prettier");
  return prettier
    .format(types, {
      semi: false,
      parser: "typescript",
    })
    .trim();
}
