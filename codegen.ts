import { config as loadEnv } from "dotenv";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";
import type { CodegenConfig } from "@graphql-codegen/cli";

// Load environment variables from .env.local (fallback to default .env if needed)
loadEnv({ path: ".env.local" });

const SUPABASE_GRAPHQL_URL = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_GRAPHQL_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase GraphQL environment variables for codegen."
  );
}

const config: CodegenConfig = {
  schema: {
    [SUPABASE_GRAPHQL_URL]: {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    },
  },
  documents: [
    "graphql/**/*.graphql",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  generates: {
    "./gql/": {
      preset: "client",
      documentTransforms: [addTypenameSelectionDocumentTransform],
      config: {
        scalars: {
          UUID: "string",
          Date: "string",
          Datetime: "string",
          BigInt: "string",
          JSON: "Record<string, unknown>",
          JSONObject: "Record<string, unknown>",
        },
      },
    },
  },
};

export default config;
