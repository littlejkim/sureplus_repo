/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMoscatoUser = /* GraphQL */ `
  query GetMoscatoUser($id: ID!) {
    getMoscatoUser(id: $id) {
      id
      name
      phonenumber
      deviceId
      createdAt
      updatedAt
    }
  }
`;
export const listMoscatoUsers = /* GraphQL */ `
  query ListMoscatoUsers(
    $filter: ModelMoscatoUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoscatoUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phonenumber
        deviceId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
