import { ApolloServer, gql } from "apollo-server";
import products from "./products.json" assert { type: "json" };

// GraphQL Schema
const typeDefs = gql`
  type Variant {
    variantId: ID!
    color: String!
    size: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    currency: String!
    variants: [Variant!]!
    marketingText: String
    images: [String!]!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    searchProducts(name: String!): [Product!]!
  }
`;

// Mock-Daten

// Resolver
const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find((product) => product.id === id),
    searchProducts: (_, { name }) =>
      products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      ),
  },
};

// Apollo Server erstellen
const server = new ApolloServer({ typeDefs, resolvers });

// Server starten
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
