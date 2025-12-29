"use client";

import { gql, useQuery } from "@apollo/client";
import { DUMMY_USER_ID } from "@/lib/constants";

const GET_CATEGORIES = gql`
  query GetCategories($userId: UUID!) {
    categoriesCollection(
      filter: {
        or: [{ user_id: { eq: $userId } }, { is_system: { eq: true } }]
      }
      orderBy: [{ is_system: DescNullsLast }, { name: AscNullsLast }]
    ) {
      edges {
        node {
          id
          name
          type
          is_system
        }
      }
    }
  }
`;

export default function Page() {
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: { userId: DUMMY_USER_ID },
    fetchPolicy: "cache-first",
  });

  const categories = data?.categoriesCollection?.edges ?? [];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Categories (system + yours)</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      <ul className="list-disc pl-5 space-y-1">
        {categories.map(({ node }: any) => (
          <li key={node.id}>
            <span className="font-medium">{node.name}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              ({node.type}) {node.is_system ? "• system" : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
