const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    launches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    products: [Product]
    product(id: ID!): [Product]
    me: User
  }

  type Mutation {
    # if false, signup failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String # login token

    createProduct(price: String!, productName: String!, productImage: String!, description: String!): ProductCreateResponse!
    updateProduct(id: ID!, price: String!, productName: String!, productImage: String!, description: String!): ProductUpdateResponse!
    deleteProduct(id: ID!): ProductDeleteResponse!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type ProductCreateResponse {
    success: Boolean!
    message: String
    product: Product
  }

  type ProductUpdateResponse {
    success: Boolean!
    message: String
    rowAffected: Int!
  }

  type ProductDeleteResponse {
    success: Boolean!
    message: String
    rowAffected: Int!
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Product {
    id: ID!
    productName: String!
    description: String!
    productImage: String!
    price: String!
    updatedAt: String!
    createdAt: String!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;
