export declare const ROOT_DIR: string;
export declare const GITHUB_BLOB_URL = "https://github.com/charrue/composable/blob/main/packages";
export declare const isPublicFunctionName: (pkg: string, name: string) => boolean;
export declare function getTypeDefinition(pkg: string, name: string): Promise<string | undefined>;
