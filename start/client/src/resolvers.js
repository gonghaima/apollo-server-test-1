import gql from "graphql-tag";
import { GET_CART_ITEMS } from "./pages/cart";

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
    updateItemsPerPage(num: Int!): Boolean!
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
  },
  Mutation: {
    addOrRemoveFromCart: (_, { id }, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      const data = {
        cartItems: cartItems.includes(id)
          ? cartItems.filter(i => i !== id)
          : [...cartItems, id]
      };
      cache.writeQuery({ query: GET_CART_ITEMS, data });
      return data.cartItems;
    },
    updateItemsPerPage: (_, { num }, { cache }) => {
      cache.writeData({
        data: {
          itemsPerPage: num
        }
      });
      return null;
    }
  }
};
