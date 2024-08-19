import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($telegram_id: String!) {
    getUser(telegram_id: $telegram_id) {
      id
      coin_balance
    }
  }
`;

export const INCREMENT_COINS = gql`
  mutation IncrementCoins($telegram_id: String!, $amount: Int!) {
    incrementCoins(telegram_id: $telegram_id, amount: $amount) {
      id
      telegram_id
      coin_balance
    }
  }
`;
