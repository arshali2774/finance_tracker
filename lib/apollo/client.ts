import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const supabaseGraphqlUrl = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseGraphqlUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase GraphQL URL or anon key is missing. Check your environment variables."
  );
}

const graphqlUrl = supabaseGraphqlUrl;
const anonKey = supabaseAnonKey;

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    devtools: {
      enabled: process.env.NODE_ENV === "development",
    },
    link: new HttpLink({
      uri: graphqlUrl,
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    }),
  });
}

let browserClient: ApolloClient<any> | null = null;

export function getApolloClient() {
  if (typeof window === "undefined") {
    return createApolloClient(); // fresh client per server request
  }
  if (!browserClient) {
    browserClient = createApolloClient();
  }
  return browserClient;
}
