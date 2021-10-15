import React from "react";
import { ApolloWrapper } from "../../apollo/ApolloWrapper"
import { client } from "../../apollo/client";
import { UserWrapper, CartWrapper } from "../../contexts"

export const wrapRootElement = ({ element }) => {
  return (<ApolloWrapper client={client}>
      <UserWrapper>
        <CartWrapper>{element}</CartWrapper>
      </UserWrapper>
    </ApolloWrapper>);
};
