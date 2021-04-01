/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMoscatoUser = /* GraphQL */ `
  query GetMoscatoUser($id: ID!) {
    getMoscatoUser(id: $id) {
      id
      phoneNumber
      firstName
      lastName
      deviceId
      plaidToken {
        bankName
        token
      }
      updatedAt
      createdAt
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
        phoneNumber
        firstName
        lastName
        deviceId
        plaidToken {
          bankName
          token
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getUserDevice = /* GraphQL */ `
  query GetUserDevice($id: ID!) {
    getUserDevice(id: $id) {
      id
      deviceId
      phoneNumber
      userId
      isVerified
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserDevices = /* GraphQL */ `
  query ListUserDevices(
    $filter: ModelUserDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        deviceId
        phoneNumber
        userId
        isVerified
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
