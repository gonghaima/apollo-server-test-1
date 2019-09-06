import gql from "graphql-tag";

/******************************************************************************************************************************************************
 * To add a virtual field, first extend the type of the data you're adding the field to in your client schema. Here, we're extending the Launch type: *
 ******************************************************************************************************************************************************/
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

/********************************************************************************************************
 * specify a client resolver on the Launch type to tell Apollo Client how to resolve your virtual field *
 ********************************************************************************************************/
export const resolvers = {
  Launch: {
    isInCart: (launch, _, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      return cartItems.includes(launch.id);
    }
  }
};
