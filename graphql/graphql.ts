import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Configure the GraphQL client
const client = new ApolloClient({
  uri: 'your-graphql-api-url',
  cache: new InMemoryCache(),
});

// Function to execute a GraphQL query with variables
export async function query(queryString: string, variables?: Record<string, any>): Promise<any> {
  const { data, errors } = await client.query({
    query: gql(queryString),
    variables,
  });

  if (errors) {
    console.error('GraphQL query errors:', errors);
    throw new Error('An error occurred while executing the GraphQL query.');
  }

  return data;
}
